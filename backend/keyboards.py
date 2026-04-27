from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton


def main_menu(is_running: bool) -> ReplyKeyboardMarkup:
    toggle = "⏹ Стоп" if is_running else "▶️ Старт"
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📡 Налаштувати джерела")],
            [KeyboardButton(text="🎯 Налаштувати цільовий канал")],
            [KeyboardButton(text=toggle), KeyboardButton(text="📊 Статус")],
        ],
        resize_keyboard=True,
    )


def sources_menu(sources: list) -> InlineKeyboardMarkup:
    rows = [
        [InlineKeyboardButton(text="➕ Додати джерело", callback_data="src_add")],
    ]
    for s in sources:
        rows.append(
            [
                InlineKeyboardButton(
                    text=f"❌ {s['source_link']}",
                    callback_data=f"src_del:{s['id']}",
                )
            ]
        )
    rows.append([InlineKeyboardButton(text="« Назад", callback_data="back")])
    return InlineKeyboardMarkup(inline_keyboard=rows)
