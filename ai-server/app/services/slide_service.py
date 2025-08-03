from app.utils.slide_loader import get_slide_message_gpt, is_last_slide
from app.repositories.chatbot_repository import save_chat_message
from app.models.chatbot_message import RoleEnum
from app.services.context_service import update_user_context

def handle_slide_step(db, user_id: str, context: dict) -> dict:
    idx = context.get("slide_idx", 0)
    platform = context.get("platform")
    
    result = get_slide_message_gpt(user_id, platform, idx)
    if not result:
        return {"messages": [{"role": "assistant", "type": "text", "content": "슬라이드를 불러오지 못했어요."}]}

    # 다음 슬라이드 index 계산
    if is_last_slide(platform, idx):
        update_user_context(user_id, {"stage": "step4", "slide_idx": 0})
    else:
        update_user_context(user_id, {"slide_idx": idx + 1})

    # 슬라이드 설명 저장
    save_chat_message(db, user_id, RoleEnum.assistant, result["text"])

    return {
        "messages": [
            {"role": "assistant", "type": "image", "content": result["image"]},
            {"role": "assistant", "type": "text", "content": result["text"] + "\n\n👉 다음으로 넘어가려면 '다음'이라고 입력해 주세요!"}
        ]
    }
