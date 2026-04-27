import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

API_ID = int(os.environ.get("API_ID", "0") or "0")
API_HASH = os.environ.get("API_HASH", "")
BOT_TOKEN = os.environ.get("BOT_TOKEN", "")
GEMINI_KEY = os.environ.get("GEMINI_KEY", "")
TELETHON_SESSION = os.environ.get("TELETHON_SESSION", "")
PARSE_INTERVAL_MINUTES = int(os.environ.get("PARSE_INTERVAL_MINUTES", "10"))
TRIAL_DAYS = int(os.environ.get("TRIAL_DAYS", "3"))
DB_PATH = str(ROOT_DIR / "bot.db")
