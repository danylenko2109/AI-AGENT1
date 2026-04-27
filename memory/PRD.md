# SaaS News AI Agent inside Telegram — PRD

## Original Problem Statement
Telegram-бот на aiogram 3.x для автоматизації контенту: парсинг каналів-донорів через Telethon, рерайт через Gemini 1.5 Flash, генерація картинок через Pollinations AI, постинг у цільовий канал. SQLite БД, тріал 3 дні, інтерфейс UA.

## Architecture
- **Stack**: Python 3.11, aiogram 3.13, Telethon 1.36, google-generativeai 0.8.3, aiosqlite 0.20
- **Entry point**: `main.py` (asyncio.gather → bot polling + parser loop)
- **Storage**: SQLite (`bot.db`)
- **Image gen**: Pollinations AI via URL
- **Sessions**: Telethon StringSession in `.env`

## Files
| File | Purpose |
|------|---------|
| `main.py` | asyncio.gather entry |
| `config.py` | env loader |
| `database.py` | aiosqlite CRUD (users, sources, posted_hashes) |
| `bot_handlers.py` | aiogram FSM router |
| `keyboards.py` | Reply/Inline keyboards |
| `states.py` | FSM states |
| `parser.py` | Telethon parsing + AI rewrite + post |
| `ai_rewriter.py` | Gemini 1.5 Flash wrapper |
| `auth_session.py` | One-time StringSession generator |

## Implemented (Feb 2026)
- ✅ Admin menu UA: джерела / цільовий канал / старт-стоп / статус
- ✅ Перший /start → admin; інші юзери блокуються
- ✅ FSM для введення джерела і цільового каналу
- ✅ aiosqlite БД з міграцією при старті
- ✅ Telethon parser loop (10 хв інтервал)
- ✅ Gemini рерайт у форматі `Заголовок | Текст | Image prompt`
- ✅ Pollinations URL для фото
- ✅ Hash-дедуплікація (останні 100 на користувача)
- ✅ Тріал 3 дні + автостоп + повідомлення про оплату
- ✅ Команда `/pay <user_id>` для адміна

## Required Credentials (.env)
- `API_ID`, `API_HASH` — my.telegram.org
- `BOT_TOKEN` — @BotFather
- `GEMINI_KEY` — aistudio.google.com/apikey
- `TELETHON_SESSION` — згенерувати через `python auth_session.py`

## Backlog (P1/P2)
- P1: Webhook-режим замість polling
- P1: Stripe/Crypto інтеграція для оплати тріала
- P1: Multi-tenant (зараз один адмін)
- P2: Аналітика постів (CTR, охоплення)
- P2: Розклад постингу за годинами
- P2: Кастомні промпти для рерайту під канал
- P2: Підтримка медіа з оригінального поста (відео, документи)

## Next Actions
1. Користувач заповнює `.env` ключами
2. Запускає `python auth_session.py` і копіює сесію
3. `python main.py` для старту
