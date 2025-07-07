import httpx
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("API_SERVER_URL", "http://localhost:8095")  # fallback도 포함
SPRING_API_URL = f"{BASE_URL}/api/step5/post"

async def post_to_spring_board(user_id: int, platform: str, title: str, content: str, translated_title: str, translated_content: str, target: str) -> bool:
    payload = {
        "userId": user_id,
        "platform": platform,
        "title": title,
        "content": content,
        "translatedTitle": translated_title,
        "translatedContent": translated_content,
        "target": target  # "domestic" / "foreign" / "both"
    }

    print("📡 [post_to_spring_board] 호출됨")
    print("📤 payload:", payload)
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(SPRING_API_URL, json=payload, timeout=10.0)
            print("📥 응답 코드:", response.status_code)
            print("📥 응답 내용:", response.text)
            return response.status_code == 200
    except Exception as e:
        print(f"❌ 게시 요청 실패: {e}")
        return False
