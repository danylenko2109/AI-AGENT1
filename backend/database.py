import aiosqlite
from datetime import datetime, timezone, timedelta
from config import DB_PATH, TRIAL_DAYS


async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                username TEXT,
                target_channel TEXT,
                is_running INTEGER DEFAULT 0,
                trial_start TEXT,
                is_paid INTEGER DEFAULT 0,
                is_admin INTEGER DEFAULT 0,
                created_at TEXT
            );
            CREATE TABLE IF NOT EXISTS sources (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                source_link TEXT,
                last_msg_id INTEGER DEFAULT 0,
                UNIQUE(user_id, source_link)
            );
            CREATE TABLE IF NOT EXISTS posted_hashes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                hash TEXT,
                posted_at TEXT
            );
            CREATE INDEX IF NOT EXISTS idx_hashes_user ON posted_hashes(user_id, hash);
            """
        )
        await db.commit()


async def get_or_create_user(user_id: int, username: str = ""):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
        row = await cur.fetchone()
        if row:
            return dict(row)
        cur = await db.execute("SELECT COUNT(*) FROM users")
        (cnt,) = await cur.fetchone()
        is_admin = 1 if cnt == 0 else 0
        now = datetime.now(timezone.utc).isoformat()
        await db.execute(
            "INSERT INTO users (user_id, username, trial_start, is_admin, created_at) VALUES (?, ?, ?, ?, ?)",
            (user_id, username, now, is_admin, now),
        )
        await db.commit()
        cur = await db.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
        return dict(await cur.fetchone())


async def update_user(user_id: int, **fields):
    if not fields:
        return
    cols = ", ".join(f"{k} = ?" for k in fields)
    vals = list(fields.values()) + [user_id]
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(f"UPDATE users SET {cols} WHERE user_id = ?", vals)
        await db.commit()


async def add_source(user_id: int, link: str):
    async with aiosqlite.connect(DB_PATH) as db:
        try:
            await db.execute(
                "INSERT INTO sources (user_id, source_link) VALUES (?, ?)",
                (user_id, link),
            )
            await db.commit()
            return True
        except aiosqlite.IntegrityError:
            return False


async def remove_source(user_id: int, link: str):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "DELETE FROM sources WHERE user_id = ? AND source_link = ?",
            (user_id, link),
        )
        await db.commit()


async def list_sources(user_id: int):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute(
            "SELECT id, source_link, last_msg_id FROM sources WHERE user_id = ?",
            (user_id,),
        )
        return [dict(r) for r in await cur.fetchall()]


async def update_source_last_id(source_id: int, last_msg_id: int):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "UPDATE sources SET last_msg_id = ? WHERE id = ?",
            (last_msg_id, source_id),
        )
        await db.commit()


async def hash_exists(user_id: int, h: str):
    async with aiosqlite.connect(DB_PATH) as db:
        cur = await db.execute(
            "SELECT 1 FROM posted_hashes WHERE user_id = ? AND hash = ?",
            (user_id, h),
        )
        return await cur.fetchone() is not None


async def add_hash(user_id: int, h: str):
    async with aiosqlite.connect(DB_PATH) as db:
        now = datetime.now(timezone.utc).isoformat()
        await db.execute(
            "INSERT INTO posted_hashes (user_id, hash, posted_at) VALUES (?, ?, ?)",
            (user_id, h, now),
        )
        cur = await db.execute(
            "SELECT id FROM posted_hashes WHERE user_id = ? ORDER BY id DESC LIMIT 1 OFFSET 100",
            (user_id,),
        )
        row = await cur.fetchone()
        if row:
            await db.execute(
                "DELETE FROM posted_hashes WHERE user_id = ? AND id <= ?",
                (user_id, row[0]),
            )
        await db.commit()


async def get_active_users():
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cur = await db.execute("SELECT * FROM users WHERE is_running = 1")
        return [dict(r) for r in await cur.fetchall()]


def trial_status(user: dict) -> tuple[bool, int]:
    if user.get("is_paid"):
        return True, -1
    if not user.get("trial_start"):
        return False, 0
    start = datetime.fromisoformat(user["trial_start"])
    end = start + timedelta(days=TRIAL_DAYS)
    now = datetime.now(timezone.utc)
    if now < end:
        days_left = (end - now).days + 1
        return True, days_left
    return False, 0
