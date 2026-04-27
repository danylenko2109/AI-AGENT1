import asyncio
from telethon import TelegramClient
from telethon.sessions import StringSession
from config import API_ID, API_HASH


async def main():
    if not API_ID or not API_HASH:
        print("Set API_ID and API_HASH in .env first.")
        return
    async with TelegramClient(StringSession(), API_ID, API_HASH) as client:
        s = client.session.save()
        print("\n=== TELETHON_SESSION (copy into .env) ===")
        print(s)
        print("=========================================\n")


if __name__ == "__main__":
    asyncio.run(main())
