import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()  # ✅ 환경변수 로드

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_chatgpt(prompt: str) -> str:
    print("🟡 GPT 호출 프롬프트:", prompt)  # 디버깅 로그 출력

    try:
        response = client.chat.completions.create(
            model="gpt-4.1",  # 필요 시 gpt-3.5-turbo로 변경
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )

        result = response.choices[0].message.content.strip()
        print("🟢 GPT 응답:", result)  # 디버깅 로그 출력
        return result

    except Exception as e:
        print("🔴 GPT 호출 오류:", str(e))  # 콘솔에 에러 출력
        return "⚠️ GPT 응답을 처리하는 중 오류가 발생했습니다."
