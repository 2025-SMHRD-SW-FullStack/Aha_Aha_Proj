from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_chatgpt(user_id: int, system_prompt: str, user_prompt: str, chat_history: list[dict] = None) -> str:
    print("🔵 GPT 호출 중...")

    # ✅ system 프롬프트를 외부에서 받음
    messages = [{"role": "system", "content": system_prompt}]
    if chat_history:
        messages += chat_history
    messages.append({"role": "user", "content": user_prompt})

    try:
        response = client.chat.completions.create(
            model="gpt-4.1",  # 또는 "gpt-4.1"
            messages=messages,
            temperature=0.7,
            max_tokens=2048  # ✅ 혹시 몰라서 길이도 넉넉히 설정
        )
        result = response.choices[0].message.content.strip()
        print("🟢 GPT 응답:", result)
        return result
    except Exception as e:
        print("🔴 GPT 호출 오류:", str(e))
        return "죄송합니다. 응답에 문제가 발생했습니다."
