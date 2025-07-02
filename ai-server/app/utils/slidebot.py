# app/utils/slidebot.py

import json
import os
from app.core.chatbot_state import get_user_context, update_user_context
from app.utils.gpt import call_chatgpt

# 캐싱
slide_cache = {}

def load_slides(platform: str) -> list[dict]:
    if platform in slide_cache:
        return slide_cache[platform]

    base_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.normpath(os.path.join(base_dir, "..", "data", f"{platform.lower()}_slides.json"))
    if not os.path.exists(json_path):
        return []

    with open(json_path, encoding="utf-8") as f:
        slides = json.load(f)
        slide_cache[platform] = slides
        return slides

def get_slide(slides: list[dict], page: int) -> dict | None:
    for slide in slides:
        if slide["page"] == page:
            return slide
    return None

def run_slidebot_if_needed(user_id: str) -> dict:
    context = get_user_context(user_id)
    platform = context.get("platform") or "amazon"
    page = context.get("page", 1)

    slides = load_slides(platform)
    if not slides:
        return {"response": f"❌ '{platform}' 플랫폼의 슬라이드 데이터를 찾을 수 없습니다."}

    slide = get_slide(slides, page)
    if not slide:
        return {"response": "🎉 모든 슬라이드를 완료했습니다!"}

    prompt = f"""
    아래 슬라이드 내용을 사용자가 이해할 수 있게 쉽게 설명해줘.

    제목: {slide['title']}
    내용: {slide['content']}

    마지막에 '이해되면 "다음"이라고 말해주세요' 문장도 꼭 넣어줘.
    """
    gpt_answer = call_chatgpt(prompt)

    return {
        "step": 3,
        "response": gpt_answer,
        "image": slide["image"],
        "context": {
            "page": slide["page"],
            "title": slide["title"],
            "content": slide["content"]
        }
    }

def advance_slide(user_id: str) -> dict:
    context = get_user_context(user_id)
    page = context.get("page", 1)
    next_page = page + 1
    update_user_context(user_id, {"page": next_page})
    return run_slidebot_if_needed(user_id)
