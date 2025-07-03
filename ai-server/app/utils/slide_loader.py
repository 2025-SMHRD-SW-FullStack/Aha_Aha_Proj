import json
import os

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


def get_slide_message(platform: str, index: int) -> str:
    slide = get_current_slide(platform, index)
    if not slide:
        return "현재 보여드릴 슬라이드가 없어요."

    title = slide.get("title", f"슬라이드 {index + 1}")
    content = slide.get("content", "")
    image_url = slide.get("image", "")

    message = (
        f"📘 **{title}**\n"
        f"{content}\n\n"
        f"🖼️ 이미지: {image_url}\n\n"
        f"이해되셨다면 '다음'이라고 입력해 주세요!"
    )
    return message
