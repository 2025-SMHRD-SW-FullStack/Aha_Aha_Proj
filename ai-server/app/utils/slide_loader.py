import json
import os
from app.core.gpt_client import call_chatgpt

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLIDE_DATA_DIR = os.path.join(BASE_DIR, "data")

PLATFORM_FILES = {
    "amazon": "amazon_slides.json",
    "shopee": "shopee_slides.json"
}


def load_slides(platform: str) -> list:
    filename = PLATFORM_FILES.get(platform.lower())
    if not filename:
        return []
    
    path = os.path.join(SLIDE_DATA_DIR, filename)
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def get_current_slide(platform: str, index: int) -> dict | None:
    slides = load_slides(platform)
    if 0 <= index < len(slides):
        return slides[index]
    return None


def get_total_slides(platform: str) -> int:
    slides = load_slides(platform)
    return len(slides)


def is_last_slide(platform: str, index: int) -> bool:
    total = get_total_slides(platform)
    return index >= total - 1


def get_slide_message_gpt(user_id: str, platform: str, index: int) -> dict:
    slide = get_current_slide(platform, index)
    slides = get_total_slides(platform)  # 🔥 이 함수는 전체 슬라이드 불러오는 함수 (길이 계산용)

    if not slide:
        return None

    title = slide.get("title", f"슬라이드 {index + 1}")
    content = slide.get("content", "")
    image = slide.get("image", "")
    total = slides
    slide_position = f"📊 슬라이드 {index + 1} / {total}"

    # GPT에게 넘기는 프롬프트
    explanation = call_chatgpt(
        user_id=user_id,
        system_prompt="다음 슬라이드 내용을 초보자도 이해할 수 있게 자연스럽고 친절하게 설명해줘.",
        user_prompt=f"슬라이드 제목: {title}\n슬라이드 내용: {content}",
        chat_history=[]
    )

    return {
        "image": f"http://localhost:8000{image}",
        "text": f"{slide_position}\n\n{explanation}"
    }