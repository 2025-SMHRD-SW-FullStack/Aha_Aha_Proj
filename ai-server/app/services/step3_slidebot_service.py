import os
import json
from app.core.slidebot_state import get_user_slide, advance_user_slide, SlideBotState
from app.utils.gpt import call_chatgpt
from app.utils.pdf_loader import convert_pdf_to_images

SLIDEBOT = SlideBotState()

SLIDE_JSON_PATH = "app/pdf/amazon_guide_pages.json"
SLIDES = []
if os.path.exists(SLIDE_JSON_PATH):
    with open(SLIDE_JSON_PATH, encoding="utf-8") as f:
        SLIDES = json.load(f)


def init_slides_from_pdf(pdf_path: str, output_dir: str):
    slide_paths = convert_pdf_to_images(pdf_path, output_dir)
    SLIDEBOT.set_slides(slide_paths)

    slide_data = []
    for idx, path in enumerate(slide_paths):
        slide_data.append({
            "page": idx,
            "title": f"슬라이드 {idx+1}",
            "content": f"슬라이드 {idx+1}의 설명 내용입니다.",
            "image": path.replace("app/static/", "/static/")
        })

    with open(SLIDE_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(slide_data, f, ensure_ascii=False, indent=2)

    return slide_paths[0]


def next_slide():
    return SLIDEBOT.move_next()


def is_last_slide():
    return SLIDEBOT.is_finished()


def get_slide_content(page_num: int):
    for slide in SLIDES:
        if slide["page"] == page_num:
            return slide
    return None


def handle_slide_interaction(user_id: str, user_input: str) -> dict:
    page = get_user_slide(user_id)
    slide = get_slide_content(page)

    if not slide:
        return {"response": "🎉 모든 슬라이드를 완료했습니다!"}

    lower_input = user_input.strip().lower()

    if lower_input in {"다음", "넘겨", "ㅇㅋ", "ok", "next"}:
        advance_user_slide(user_id)
        next_page = get_user_slide(user_id)
        next_slide = get_slide_content(next_page)

        if next_slide:
            prompt = f"""
            현재 슬라이드 제목: {next_slide["title"]}
            내용: {next_slide["content"]}

            이 내용을 쉽게 설명해줘.
            마지막에 '이해되면 "다음"이라고 말해주세요' 문장도 꼭 넣어줘.
            """
            gpt_answer = call_chatgpt(prompt)
            return {
                "response": f"📄 다음 슬라이드로 이동했어요!\n\n{gpt_answer}",
                "image": next_slide["image"]
            }
        else:
            return {"response": "🎉 모든 슬라이드를 완료했습니다!"}

    prompt = f"""
    너는 사용자가 아마존 입점 가이드를 이해할 수 있도록 도와주는 챗봇이야.

    제목: {slide["title"]}
    내용: {slide["content"]}

    사용자의 질문: "{user_input}"

    이 내용을 친절하게 설명해주고,
    마지막에 '이해되면 "다음"이라고 말해주세요' 문장도 꼭 넣어줘.
    """
    gpt_answer = call_chatgpt(prompt)

    return {
        "response": gpt_answer,
        "image": slide["image"]
    }
