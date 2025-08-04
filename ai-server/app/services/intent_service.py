import json
from app.core.gpt_client import call_chatgpt

def classify_intent_and_response(user_id: str, message: str) -> tuple[str, str, str]:
    PROMPT = f"""
다음 사용자 메시지를 분석해서 JSON 형식으로 의도(intent), 응답 메시지(response), 아이템(item)을 추출하세요.

가능한 intent는 다음 중 하나입니다:
- item_input
- title_input
- next_slide
- confirm_posting
- cancel
- question
- greeting
- off_topic

아이템(item)은 사용자가 수출하려는 구체적인 제품명을 의미합니다.
없으면 null로 지정하세요.

반드시 아래 형식의 JSON만 출력하세요:

{{
  "intent": "...",
  "response": "...",
  "item": "..." or null
}}

예시 입력: "비누 수출하고 싶은데 어디가 좋을까?"
예시 출력:
{{
  "intent": "item_input",
  "response": "비누를 수출하려고 하시는군요! 유망 국가를 추천해드릴게요.",
  "item": "비누"
}}

아래는 실제 사용자 메시지입니다:
"{message}"
"""

    try:
        gpt_resp = call_chatgpt(
            user_id=user_id,
            system_prompt="",
            user_prompt=PROMPT,
            chat_history=[]
        )
        data = json.loads(gpt_resp)
        return (
            data.get("intent", "off_topic"),
            data.get("response", ""),
            data.get("item", None)
        )
    except Exception as e:
        print("❌ Intent 분류 실패:", e)
        return "off_topic", "죄송하지만 이해하지 못했어요. 다시 말씀해주시겠어요?", None
