from app.core.gpt_client import call_chatgpt
from app.services.context_service import update_user_context
from app.utils.title_content_utils import extract_title_content_with_gpt, translate_post
from app.repositories.chatbot_repository import save_chat_message
from app.models.chatbot_message import RoleEnum

def handle_title_content_step(db, user_id: str, message: str) -> dict:
    try:
        title_kr, content_kr = extract_title_content_with_gpt(user_id, message)
        if not title_kr and not content_kr:
            raise ValueError("제목과 내용을 모두 추출하지 못했습니다.")

        en_title, en_content = translate_post(user_id, title_kr, content_kr)

        update_user_context(user_id, {
            "post_title_kr": title_kr,
            "post_content_kr": content_kr,
            "translated_title": en_title,
            "translated_content": en_content
        })

        reply = (
            f"✅ 번역이 완료되었어요!\n\n"
            f"📌 [한글 제목] {title_kr}\n🌍 [영문 제목] {en_title}\n\n"
            f"📌 [한글 내용] {content_kr}\n🌍 [영문 내용] {en_content}\n\n"
            "👉 이대로 게시할까요? (네/아니요)"
        )
        save_chat_message(db, user_id, RoleEnum.assistant, reply)
        return {"messages": [{"role": "assistant", "type": "text", "content": reply}]}

    except Exception as e:
        error = f"❌ 제목/내용 처리 중 오류가 발생했어요. 다시 입력해 주세요. ({e})"
        save_chat_message(db, user_id, RoleEnum.assistant, error)
        return {"messages": [{"role": "assistant", "type": "text", "content": error}]}
