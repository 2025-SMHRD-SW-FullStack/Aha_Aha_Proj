# app/services/slidebot_service.py
from app.services.slide_loader import load_slides
from app.core.gpt_client import call_chatgpt

# 간단한 인메모리 상태관리 (실무는 Redis 등 추천)
user_slide_index = {}

def get_current_slide(user_id: str, platform: str = "shopee"):
    slides = load_slides(platform)
    index = user_slide_index.get(user_id, 0)

    if index >= len(slides):
        return {"done": True, "message": "모든 슬라이드를 완료했습니다."}

    slide = slides[index]
    user_slide_index[user_id] = index  # 현재 인덱스 저장

    # GPT 설명 호출
    prompt = f"이 슬라이드에 대해 사용자가 쉽게 이해할 수 있도록 친절하게 설명해줘:\n\n제목: {slide['title']}\n내용: {slide['content']}"
    explanation = call_chatgpt(prompt)

    return {
        "done": False,
        "step": index + 1,
        "total": len(slides),
        "imageUrl": slide["image"],  # 예: /static/slides/shopee/slide_1.png
        "title": slide["title"],
        "content": slide["content"],
        "gptExplanation": explanation
    }

def go_to_next_slide(user_id: str, platform: str = "shopee"):
    user_slide_index[user_id] = user_slide_index.get(user_id, 0) + 1
    return get_current_slide(user_id, platform)
