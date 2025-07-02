# app/services/chatbot_service.py

from app.utils.gpt import call_chatgpt
from app.services.chatbot_state import (
    get_user_context,
    update_user_context,
    get_chat_history,
    append_chat_message,
    load_chat_history_to_redis
)
from app.services.slidebot_service import get_current_slide, go_to_next_slide
from app.repositories.chatbot_repository import save_chat_message, get_recent_messages
from app.models.chatbot_message import RoleEnum

MAX_HISTORY = 6  # Redis에 저장될 대화 수 제한


class ChatbotService:
    def handle(self, user_id: str, message: str) -> dict:
        # ✅ 컨텍스트 불러오기
        context = get_user_context(user_id)
        stage = context.get("stage", "start")

        # ✅ 메시지 저장 (RDB + Redis)
        save_chat_message(user_id, RoleEnum.user, message)
        append_chat_message(user_id, "user", message)

        # ✅ 대화 히스토리 불러오기 (Redis → 없으면 RDB → Redis 복구)
        chat_history = get_chat_history(user_id)
        if not chat_history:
            db_logs = get_recent_messages(user_id, limit=MAX_HISTORY)
            messages = [{"role": msg.role.value, "content": msg.content} for msg in db_logs]
            load_chat_history_to_redis(user_id, messages)
            chat_history = get_chat_history(user_id)

        # ✅ GPT에게 판단 요청
        prompt = self._build_prompt(context, message)
        decision = call_chatgpt(prompt, chat_history=chat_history).lower().strip()

        # ✅ GPT 판단 로그 저장 (RDB + Redis)
        system_msg = f"[GPT 판단]: {decision}"
        save_chat_message(user_id, RoleEnum.system, system_msg)
        append_chat_message(user_id, "system", system_msg)

        # ✅ 각 단계 분기 처리
        if decision.startswith("item:"):
            return self._handle_item(user_id, decision)

        if decision.startswith("country:"):
            return self._handle_country(user_id, decision)

        if decision.startswith("platform:"):
            return self._handle_platform(user_id, decision)

        if message.strip().lower() in {"다음", "next", "ok", "ㅇㅋ", "넘겨"}:
            return self._handle_next(user_id)

        if "guide" in decision:
            return self._handle_guide(user_id)

        if decision.startswith("translate:"):
            return self._handle_translate(user_id)

        if "done" in decision:
            update_user_context(user_id, {"stage": "done"})
            final_response = "🎉 모든 수출 절차를 완료했습니다!"
            self._save_bot_response(user_id, final_response)
            return {"step": 5, "response": final_response}

        default_response = "🤖 어떤 품목을 수출하고 싶으신가요? (예: 마스크팩, 화장품, 의류 등)"
        self._save_bot_response(user_id, default_response)
        return {"step": 0, "response": default_response}

    def _build_prompt(self, context, message):
        return f"""
        [사용자 입력]: "{message}"
        [현재 진행 단계]: {context.get("stage")}
        [현재 저장 정보]: 품목={context.get('item')}, 국가={context.get('country')}, 플랫폼={context.get('platform')}

        사용자의 입력이 아래 중 어떤 것인지 판단해:
        - 품목 입력이면 'item:비누'
        - 수출 국가면 'country:미국'
        - 플랫폼이면 'platform:Amazon'
        - 입점 안내 요청이면 'guide'
        - 영어 번역 요청이면 'translate:제목|내용'
        - 모두 완료했다면 'done'
        - 아직 맥락 불분명하면 'ask'

        반드시 위 형식 중 하나만 한 줄로 출력해.
        """

    def _handle_item(self, user_id, decision):
        item = decision.split("item:")[1].strip()
        update_user_context(user_id, {"item": item, "stage": "item"})
        response = f"✅ '{item}'을(를) 수출할 품목으로 확인했어요.\n어느 나라에 수출하고 싶으세요?"
        self._save_bot_response(user_id, response)
        return {"step": 1, "response": response, "context": {"item": item}}

    def _handle_country(self, user_id, decision):
        country = decision.split("country:")[1].strip()
        update_user_context(user_id, {"country": country, "stage": "country"})
        response = f"🌍 '{country}'은 좋은 선택이에요. 어떤 플랫폼으로 수출하고 싶으세요? (예: Amazon, Shopee)"
        self._save_bot_response(user_id, response)
        return {"step": 2, "response": response, "context": {"country": country}}

    def _handle_platform(self, user_id, decision):
        platform = decision.split("platform:")[1].strip()
        update_user_context(user_id, {"platform": platform, "stage": "platform"})
        slide = get_current_slide(user_id, platform)
        response = f"📦 '{platform}' 입점 방법을 안내드릴게요!\n\n{slide['gptExplanation']}"
        self._save_bot_response(user_id, response)
        return {
            "step": 3,
            "response": response,
            "image": slide.get("imageUrl"),
            "context": {
                "page": slide.get("step"),
                "title": slide.get("title"),
                "content": slide.get("content")
            }
        }

    def _handle_next(self, user_id):
        platform = get_user_context(user_id).get("platform", "shopee")
        slide = go_to_next_slide(user_id, platform)
        response = (
            slide["message"]
            if slide["done"]
            else f"📄 다음 슬라이드로 넘어갑니다!\n\n{slide['gptExplanation']}"
        )
        self._save_bot_response(user_id, response)
        return {
            "step": 3,
            "response": response,
            "image": slide.get("imageUrl"),
            "context": {
                "page": slide.get("step"),
                "title": slide.get("title"),
                "content": slide.get("content")
            }
        }

    def _handle_guide(self, user_id):
        platform = get_user_context(user_id).get("platform", "shopee")
        slide = get_current_slide(user_id, platform)
        response = f"📘 플랫폼 가이드를 이어서 안내드릴게요.\n\n{slide['gptExplanation']}"
        self._save_bot_response(user_id, response)
        return {
            "step": 3,
            "response": response,
            "image": slide.get("imageUrl"),
            "context": {
                "page": slide.get("step"),
                "title": slide.get("title"),
                "content": slide.get("content")
            }
        }

    def _handle_translate(self, user_id):
        update_user_context(user_id, {"stage": "translate"})
        response = "🌐 번역 기능은 다음 단계에서 연결됩니다."
        self._save_bot_response(user_id, response)
        return {"step": 4, "response": response}

    def _save_bot_response(self, user_id: str, content: str):
        save_chat_message(user_id, RoleEnum.assistant, content)
        append_chat_message(user_id, "assistant", content)
