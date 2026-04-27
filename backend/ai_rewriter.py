import asyncio
import google.generativeai as genai
from config import GEMINI_KEY

if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)

PROMPT = (
    "Рерайт українською. Стиль: новинний. "
    "Формат строго: Заголовок | Текст | Промпт для фото англійською. "
    "Без зайвих слів, без markdown, без пояснень. "
    "Розділювач — символ '|'. Текст 2-4 речення.\n\nНовина:\n"
)


async def rewrite_news(text: str) -> tuple[str, str, str] | None:
    if not text or not GEMINI_KEY:
        return None
    model = genai.GenerativeModel("gemini-1.5-flash")
    try:
        resp = await asyncio.to_thread(model.generate_content, PROMPT + text)
        out = (resp.text or "").strip()
    except Exception as e:
        print(f"[AI] error: {e}")
        return None
    parts = [p.strip() for p in out.split("|")]
    if len(parts) < 3:
        return None
    title, body, image_prompt = parts[0], parts[1], " | ".join(parts[2:]).strip()
    if not title or not body or not image_prompt:
        return None
    return title, body, image_prompt
