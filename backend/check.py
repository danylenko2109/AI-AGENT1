import google.generativeai as genai

# Вставь свой ключ
key = "AIzaSyAmLYhnkiFOsJmTQolaOJqUCNVy9vhD9kQ" 
genai.configure(api_key=key)

try:
    # 1. Сначала попробуем самый стабильный алиас 2026 года
    model_name = 'gemini-flash-latest'
    
    # 2. Если хочешь увидеть все доступные тебе модели, раскомментируй строку ниже:
    # for m in genai.list_models(): print(m.name)

    model = genai.GenerativeModel(model_name)
    response = model.generate_content("Привіт, ти працюєш?")
    print(f"✅ Успіх! Модель {model_name} відповіла:")
    print(response.text)

except Exception as e:
    print(f"❌ Помилка: {e}")
    print("\n💡 Спробуй зайти в Google AI Studio и перевірити, чи не з'явилися там нові моделі типу 'gemini-3-flash'.")