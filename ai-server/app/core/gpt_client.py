from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_chatgpt(prompt: str, chat_history: list[dict] = None) -> str:
    print("🔵 GPT 호출 중...")

    messages = chat_history[:] if chat_history else []
    messages.append({"role": "user", "content": prompt})

    try:
        response = client.chat.completions.create(
            model="gpt-4.1",
            messages=messages,
            temperature=0.7,
        )
        result = response.choices[0].message.content.strip()
        print("🟢 GPT 응답:", result)
        return result
    except Exception as e:
        print("🔴 GPT 호출 오류:", str(e))
        return "죄송합니다. 응답에 문제가 발생했습니다."
