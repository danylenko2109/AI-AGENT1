import asyncio
import logging
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from config import BOT_TOKEN
from database import init_db
from bot_handlers import router
from parser import parser_loop

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")


async def main():
    if not BOT_TOKEN:
        raise RuntimeError("BOT_TOKEN is not set in .env")
    await init_db()
    bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    dp = Dispatcher()
    dp.include_router(router)
    await asyncio.gather(
        dp.start_polling(bot),
        parser_loop(bot),
    )


if __name__ == "__main__":
    asyncio.run(main())
