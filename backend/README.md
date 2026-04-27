# SaaS News AI Agent (Telegram)

## Структура
- `main.py` — точка входу (asyncio.gather бота і парсера)
- `bot_handlers.py` — aiogram хендлери (UA-меню)
- `parser.py` — Telethon парсер + AI-рерайт + постинг
- `ai_rewriter.py` — Gemini 1.5 Flash
- `database.py` — aiosqlite (users, sources, posted_hashes)
- `keyboards.py`, `states.py`, `config.py`
- `auth_session.py` — генератор Telethon StringSession (одноразово)
- `bot.db` — SQLite БД (створюється автоматично)

## Налаштування
1. Заповніть `.env`:
   - `API_ID`, `API_HASH` — https://my.telegram.org
   - `BOT_TOKEN` — @BotFather
   - `GEMINI_KEY` — https://aistudio.google.com/apikey
2. Згенеруйте Telethon-сесію:
   ```bash
   python auth_session.py
   ```
   Введіть номер телефону та код, скопіюйте отриманий рядок у `TELETHON_SESSION`.
3. Запуск:
   ```bash
   python main.py
   ```

## Логіка
- Перший користувач, який натиснув `/start`, стає адміном.
- Тріал — 3 дні. Після закінчення бот зупиняється і пише: *"Тріал закінчився, зверніться до адміна для оплати"*.
- Адмін активує оплату командою `/pay <user_id>`.
- Парсер працює кожні `PARSE_INTERVAL_MINUTES` хвилин (за замовчуванням 10).
- Зберігаються hash останніх 100 постів на користувача — щоб не дублювати.
