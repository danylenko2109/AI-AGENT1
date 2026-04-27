import asyncio
import hashlib
import urllib.parse
import re
from telethon import TelegramClient
from telethon.sessions import StringSession
from telethon.tl.types import Channel, Chat
from aiogram import Bot
from aiogram.types import URLInputFile

from config import API_ID, API_HASH, TELETHON_SESSION, PARSE_INTERVAL_MINUTES
from database import (
    get_active_users,
    list_sources,
    update_source_last_id,
    hash_exists,
    add_hash,
    trial_status,
    update_user,
)
from ai_rewriter import rewrite_news


def text_hash(text: str) -> str:
    return hashlib.md5(text.strip().lower().encode("utf-8")).hexdigest()


def pollinations_url(prompt: str) -> str:
    enc = urllib.parse.quote(prompt[:400])
    return f"https://image.pollinations.ai/prompt/{enc}?width=1024&height=1024&nologo=true"


def parse_link(link: str) -> str:
    link = link.strip()
    m = re.match(r"https?://t\.me/([^/?]+)", link)
    if m:
        return m.group(1)
    if link.startswith("@"):
        return link[1:]
    return link


async def fetch_new_messages(client: TelegramClient, source_link: str, last_id: int, limit: int = 5):
    username = parse_link(source_link)
    try:
        entity = await client.get_entity(username)
    except Exception as e:
        print(f"[Parser] cannot resolve {source_link}: {e}")
        return [], last_id
    msgs = []
    new_last = last_id
    async for msg in client.iter_messages(entity, limit=limit):
        if msg.id <= last_id:
            break
        if msg.message and len(msg.message.strip()) > 30:
            msgs.append(msg)
            if msg.id > new_last:
                new_last = msg.id
    msgs.reverse()
    return msgs, new_last


async def process_user(client: TelegramClient, bot: Bot, user: dict):
    ok, _ = trial_status(user)
    if not ok:
        await update_user(user["user_id"], is_running=0)
        try:
            await bot.send_message(
                user["user_id"],
                "Тріал закінчився, зверніться до адміна для оплати.",
            )
        except Exception:
            pass
        return
    target = user.get("target_channel")
    if not target:
        return
    sources = await list_sources(user["user_id"])
    for src in sources:
        msgs, new_last = await fetch_new_messages(client, src["source_link"], src["last_msg_id"])
        if new_last != src["last_msg_id"]:
            await update_source_last_id(src["id"], new_last)
        for m in msgs:
            h = text_hash(m.message)
            if await hash_exists(user["user_id"], h):
                continue
            result = await rewrite_news(m.message)
            if not result:
                continue
            title, body, img_prompt = result
            caption = f"<b>{title}</b>\n\n{body}"
            if len(caption) > 1024:
                caption = caption[:1020] + "..."
            try:
                photo = URLInputFile(pollinations_url(img_prompt))
                await bot.send_photo(target, photo=photo, caption=caption, parse_mode="HTML")
            except Exception as e:
                print(f"[Parser] post failed: {e}")
                try:
                    await bot.send_message(target, caption, parse_mode="HTML")
                except Exception as e2:
                    print(f"[Parser] text post failed: {e2}")
                    continue
            await add_hash(user["user_id"], h)
            await asyncio.sleep(2)


async def parser_loop(bot: Bot):
    if not API_ID or not API_HASH or not TELETHON_SESSION:
        print("[Parser] Telethon credentials missing — parser disabled")
        return
    client = TelegramClient(StringSession(TELETHON_SESSION), API_ID, API_HASH)
    await client.start()
    print("[Parser] Telethon started")
    while True:
        try:
            users = await get_active_users()
            for u in users:
                try:
                    await process_user(client, bot, u)
                except Exception as e:
                    print(f"[Parser] user {u['user_id']} error: {e}")
        except Exception as e:
            print(f"[Parser] loop error: {e}")
        await asyncio.sleep(PARSE_INTERVAL_MINUTES * 60)
