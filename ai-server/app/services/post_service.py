import asyncio
from app.utils.post_api import post_to_spring_board
from app.repositories.chatbot_repository import save_chat_message
from app.models.chatbot_message import RoleEnum
from app.services.context_service import update_user_context

def handle_posting_step(db, user_id: str, message: str, context: dict) -> dict:
    msg = message.strip().lower()

    mapping = {
        "1": "domestic",
        "국내": "domestic",
        "2": "foreign",
        "해외": "foreign",
        "3": "both",
        "둘 다": "both"
    }
    target = next((v for k, v in mapping.items() if k in msg), None)
    if not target:
        err = "❌ 게시할 대상을 인식하지 못했습니다. (예: 1, 2, 3, 국내, 해외, 둘 다)"
        save_chat_message(db, user_id, RoleEnum.assistant, err)
        return {"messages": [{"role": "assistant", "type": "text", "content": err}]}

    update_user_context(user_id, {"post_target": target, "stage": "step6"})
    success = asyncio.run(post_to_spring_board(
        user_id=int(user_id),
        platform=context.get("platform", ""),
        title=context.get("post_title_kr", ""),
        content=context.get("post_content_kr", ""),
        translated_title=context.get("translated_title", ""),
        translated_content=context.get("translated_content", ""),
        target=target
    ))

    if success:
        msg = f"✅ 게시 완료!\n👉 {'국내와 해외' if target == 'both' else target} 게시판에 등록했어요."
    else:
        msg = "❌ 게시글 등록 중 오류가 발생했어요."

    save_chat_message(db, user_id, RoleEnum.assistant, msg)
    return {"messages": [{"role": "assistant", "type": "text", "content": msg}]}
