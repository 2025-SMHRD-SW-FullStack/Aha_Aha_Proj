from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_chatgpt(user_id: int, prompt: str, chat_history: list[dict] = None) -> str:
    print("🔵 GPT 호출 중...")

    # ✅ 기본 역할 설정
    system_prompt = {
        "role": "system",
        "content": (
            "너는 친절하고 유능한 AI 수출 도우미야. "
            "사용자가 어떤 말을 해도 무시하지 말고 자연스럽게 대답해. "
            "수출과 관련된 대화는 단계별로 유도하지만, "
            "잡담, 인사, 감사 인사에도 정중하게 반응해야 해."
        )
    }

    # ✅ 메시지 구성
    messages = [system_prompt]
    if chat_history:
        messages += chat_history
    messages.append({"role": "user", "content": prompt})

    try:
        response = client.chat.completions.create(
            model="gpt-4.1",  # 또는 "gpt-4.1"
            messages=messages,
            temperature=0.7,
        )
        result = response.choices[0].message.content.strip()
        print("🟢 GPT 응답:", result)
        return result
    except Exception as e:
        print("🔴 GPT 호출 오류:", str(e))
        return "죄송합니다. 응답에 문제가 발생했습니다."
