from aiogram import Router, F
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, CallbackQuery
from aiogram.fsm.context import FSMContext

from states import AdminStates
from keyboards import main_menu, sources_menu
from database import (
    get_or_create_user,
    update_user,
    add_source,
    remove_source,
    list_sources,
    trial_status,
)

router = Router()


async def _user_or_block(message: Message):
    u = await get_or_create_user(message.from_user.id, message.from_user.username or "")
    if not u.get("is_admin"):
        await message.answer(
            "⛔️ Доступ обмежено. Цей бот доступний лише адміністратору."
        )
        return None
    return u


@router.message(CommandStart())
async def start_handler(message: Message, state: FSMContext):
    await state.clear()
    u = await get_or_create_user(message.from_user.id, message.from_user.username or "")
    if not u.get("is_admin"):
        await message.answer("⛔️ Доступ обмежено.")
        return
    ok, days = trial_status(u)
    if not ok:
        await message.answer("Тріал закінчився, зверніться до адміна для оплати.")
        return
    txt = (
        "👋 Вітаю! Я ваш AI News-агент.\n\n"
        f"🎁 Тріал активний. Залишилось днів: <b>{days if days >= 0 else '∞'}</b>\n\n"
        "Налаштуйте джерела та цільовий канал, потім натисніть Старт."
    )
    await message.answer(txt, reply_markup=main_menu(bool(u.get("is_running"))), parse_mode="HTML")


@router.message(Command("menu"))
async def menu_handler(message: Message, state: FSMContext):
    await state.clear()
    u = await _user_or_block(message)
    if not u:
        return
    await message.answer("Меню:", reply_markup=main_menu(bool(u.get("is_running"))))


@router.message(F.text == "📊 Статус")
async def status_handler(message: Message):
    u = await _user_or_block(message)
    if not u:
        return
    ok, days = trial_status(u)
    sources = await list_sources(u["user_id"])
    target = u.get("target_channel") or "—"
    running = "✅ працює" if u.get("is_running") else "⏸ зупинено"
    trial = (
        "💳 Оплачено" if u.get("is_paid") else (f"🎁 Тріал: {days} днів" if ok else "❌ Тріал закінчився")
    )
    txt = (
        f"<b>Статус агента</b>\n\n"
        f"Стан: {running}\n"
        f"Підписка: {trial}\n"
        f"Цільовий канал: <code>{target}</code>\n"
        f"Джерел: <b>{len(sources)}</b>"
    )
    await message.answer(txt, parse_mode="HTML")


@router.message(F.text == "📡 Налаштувати джерела")
async def sources_handler(message: Message):
    u = await _user_or_block(message)
    if not u:
        return
    sources = await list_sources(u["user_id"])
    text = "📡 <b>Джерела</b>\n\n"
    if sources:
        text += "\n".join(f"• {s['source_link']}" for s in sources)
    else:
        text += "<i>Список порожній</i>"
    await message.answer(text, reply_markup=sources_menu(sources), parse_mode="HTML")


@router.callback_query(F.data == "src_add")
async def src_add_cb(call: CallbackQuery, state: FSMContext):
    await state.set_state(AdminStates.waiting_source)
    await call.message.answer(
        "✏️ Надішліть посилання на канал-донор (наприклад, <code>https://t.me/example</code> або <code>@example</code>):",
        parse_mode="HTML",
    )
    await call.answer()


@router.callback_query(F.data.startswith("src_del:"))
async def src_del_cb(call: CallbackQuery):
    src_id = int(call.data.split(":")[1])
    sources = await list_sources(call.from_user.id)
    target = next((s for s in sources if s["id"] == src_id), None)
    if target:
        await remove_source(call.from_user.id, target["source_link"])
        await call.answer("Видалено")
    sources = await list_sources(call.from_user.id)
    text = "📡 <b>Джерела</b>\n\n"
    text += "\n".join(f"• {s['source_link']}" for s in sources) or "<i>Список порожній</i>"
    await call.message.edit_text(text, reply_markup=sources_menu(sources), parse_mode="HTML")


@router.callback_query(F.data == "back")
async def back_cb(call: CallbackQuery, state: FSMContext):
    await state.clear()
    u = await get_or_create_user(call.from_user.id, call.from_user.username or "")
    await call.message.answer("Меню:", reply_markup=main_menu(bool(u.get("is_running"))))
    await call.answer()


@router.message(AdminStates.waiting_source)
async def add_source_input(message: Message, state: FSMContext):
    link = (message.text or "").strip()
    if not link or " " in link:
        await message.answer("❌ Невірне посилання. Спробуйте ще раз.")
        return
    ok = await add_source(message.from_user.id, link)
    if ok:
        await message.answer(f"✅ Додано: {link}")
    else:
        await message.answer("⚠️ Це джерело вже додане.")
    await state.clear()


@router.message(F.text == "🎯 Налаштувати цільовий канал")
async def target_handler(message: Message, state: FSMContext):
    u = await _user_or_block(message)
    if not u:
        return
    await state.set_state(AdminStates.waiting_target)
    await message.answer(
        "✏️ Надішліть @username або ID цільового каналу. Бот має бути доданий туди як адмін."
    )


@router.message(AdminStates.waiting_target)
async def target_input(message: Message, state: FSMContext):
    target = (message.text or "").strip()
    if not target:
        await message.answer("❌ Невірне значення.")
        return
    await update_user(message.from_user.id, target_channel=target)
    await message.answer(f"✅ Цільовий канал збережено: <code>{target}</code>", parse_mode="HTML")
    await state.clear()


@router.message(F.text.in_({"▶️ Старт", "⏹ Стоп"}))
async def toggle_handler(message: Message):
    u = await _user_or_block(message)
    if not u:
        return
    ok, _ = trial_status(u)
    if not ok:
        await message.answer("Тріал закінчився, зверніться до адміна для оплати.")
        return
    new_state = 0 if u.get("is_running") else 1
    if new_state == 1:
        if not u.get("target_channel"):
            await message.answer("❌ Спочатку налаштуйте цільовий канал.")
            return
        sources = await list_sources(u["user_id"])
        if not sources:
            await message.answer("❌ Спочатку додайте хоча б одне джерело.")
            return
    await update_user(u["user_id"], is_running=new_state)
    msg = "✅ Агент запущено" if new_state else "⏹ Агент зупинено"
    await message.answer(msg, reply_markup=main_menu(bool(new_state)))


@router.message(Command("pay"))
async def pay_handler(message: Message):
    u = await _user_or_block(message)
    if not u:
        return
    parts = (message.text or "").split()
    if len(parts) < 2:
        await message.answer("Використання: /pay <user_id>")
        return
    try:
        target_id = int(parts[1])
    except ValueError:
        await message.answer("Невірний user_id.")
        return
    await update_user(target_id, is_paid=1)
    await message.answer(f"✅ Користувач {target_id} позначений як оплачений.")
