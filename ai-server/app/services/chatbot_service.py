from app.core.gpt_client import call_chatgpt
from app.services.chatbot_state import (
    get_user_context,
    update_user_context,
    add_chat_to_redis,
    get_chat_history,
)
from app.repositories.chatbot_repository import save_chat_message
from app.models.chatbot_message import RoleEnum, ChatbotMessage
from sqlalchemy.orm import Session
from app.utils.slide_loader import get_slide_message_gpt, is_last_slide
from app.utils.post_api import post_to_spring_board
from app.utils.recommend import get_top_country_details
from app.constants.shopee_countries import SHOPEE_COUNTRIES
import asyncio
from app.utils.slide_utils import split_slide_message

# ➕ NEW: JSON 파싱용
import json
import re

MAX_HISTORY = 10

SYSTEM_PROMPT = """
너는 사용자의 수출을 도와주는 친절하고 유능한 AI 챗봇이야. GlobalGo 플랫폼에서 활동하며, 다음과 같은 흐름으로 사용자를 도와야 해:

🧭 전체 단계 흐름:
1. 품목 입력 → 수출 유망 국가 추천 (TOP 20, 표 형식으로 제공)
2. 국가 선택 → 해당 국가에서 활용할 수 있는 이커머스 플랫폼 추천 (Amazon, Shopee 2개만 추천)
3. 플랫폼 선택 → 해당 플랫폼의 수출 가이드를 슬라이드 형식(이미지 + 설명)으로 하나씩 설명
4. 판매글 입력 (제목 + 내용) → 영어 번역 제공
5. 게시판 등록 여부 확인 (국내 / 해외 / 둘 다) → 자동 등록 처리
6. 마무리 안내 ("게시 완료! 수고 많으셨어요 😊")

📊 [중요] 국가 추천 시 표 형식 출력:
가능하면 마크다운 표 형식으로 정리해서 보여줘. 예시는 다음과 같아:

| 순위 | 국가 | 성공 확률 (%) | 추천 이유 |
|------|------|----------------|------------|
| 1 | 미국 | 83.2% | 시장이 크고 친환경 제품 선호도가 높아요 |
| 2 | 일본 | 76.5% | K-뷰티와 관련 제품에 대한 수요가 높아요 |
| 3 | 중국 | 70.4% | 대규모 소비 시장이 형성되어 있어요 |

※ 표가 너무 길면 상위 3~5개만 먼저 보여주고, "더 보기" 요청 시 나머지를 이어서 설명해도 좋아.

🖼️ [중요] 슬라이드 이미지 경로 규칙 (Amazon, Shopee):
- 슬라이드 설명 시에는 반드시 이미지 경로를 함께 제공해야 해.
- 이미지 경로는 다음 중 하나여야 하며, 새로운 경로나 외부 링크를 생성하면 안 돼.

  📦 Amazon 수출 가이드:
  http://localhost:8000/static/slides/amazon/slide_1.png
  http://localhost:8000/static/slides/amazon/slide_2.png 
  http://localhost:8000/static/slides/amazon/slide_3.png 
  http://localhost:8000/static/slides/amazon/slide_4.png 
  http://localhost:8000/static/slides/amazon/slide_5.png 

  🛒 Shopee 수출 가이드:
  http://localhost:8000/static/slides/shopee/slide_1.png 
  http://localhost:8000/static/slides/shopee/slide_2.png 
  http://localhost:8000/static/slides/shopee/slide_3.png 
  http://localhost:8000/static/slides/shopee/slide_4.png 
  http://localhost:8000/static/slides/shopee/slide_5.png 

❗ 절대 다른 URL을 만들거나 외부 이미지를 넣지 마. 정해진 경로만 사용해!

🧠 문맥 유도 기능:
- 사용자가 순서를 정확히 따르지 않아도 문맥을 자연스럽게 이어가야 해.
- "아마존", "쇼피" 같은 단어만 말해도 플랫폼 선택으로 이해하고 진행해.
- "전시관", "1", "2", "다음" 같은 짧은 말도 맥락에 따라 해석해서 대응해.
- "세금 얼마나 붙어?", "비용 많아?" 같은 질문이 들어오면 먼저 친절하게 답한 후 원래 흐름으로 자연스럽게 유도해줘.
- 사용자의 감정, 불안, 칭찬, 농담 등도 자연스럽게 반응하고 존중해줘.

💬 말투 스타일:
- 말투는 따뜻하고 친근하게, 부드럽고 명확한 어조로 설명해줘.
- 과한 이모지는 피하되, 흐름을 돕는 이모지(😊, 💬, 📦, ✅ 등)는 적절히 활용해줘.
- 초보자도 이해할 수 있도록 용어는 쉽게 설명해주고, 필요한 경우 예시도 들어줘.

예를 들어:
- "비누 수출하려고 하는데 어디가 좋아?" → TOP 국가 추천 표 제공
- "미국" → 해당 국가 플랫폼 추천
- "아마존" → 슬라이드 가이드 시작
- "다음" → 다음 슬라이드 보여줘
- "전시관에 올려줘" → 해외 게시판 자동 등록
- "질문 있어요" → 질문에 친절히 답한 후 흐름 복귀

언제나 사용자가 부담 없이 이야기할 수 있도록 진심을 담은 AI 친구처럼 대응해줘.
"""

SLIDE_PROMPT = """
다음 슬라이드 내용을 초보자도 이해할 수 있게 자연스럽고 친절하게 설명해줘.
슬라이드에 집중하되, 사용자가 다음 단계로 넘어가고 싶다고 말하면 "슬라이드를 종료하고 다음 단계로 진행할 수 있어요" 라고 안내해줘.
"""

TRANSLATE_PROMPT = """
You are a professional translator.
Translate the following product posting into natural U.S. English and return ONLY valid JSON in the form:
{{ "en_title": "...", "en_content": "..." }}

다음 한국어 제목과 내용을 자연스러운 미국식 영어로 번역해 줘.
**정확히** 위 JSON 형식만 반환하고 다른 문구는 절대 쓰지 마.

제목: "{title}"
내용: "{content}"

반드시 위 JSON 한 줄로만 답하고, 추가 텍스트, 코드블럭, 예시, 주석, 설명, 안내 등은 절대 붙이지 마라.
"""

def parse_gpt_response_to_json(raw):
    # 1. json 문자열이면
    try:
        data = json.loads(raw)
        # 케이스1. en_title/en_content가 있음
        if 'en_title' in data and 'en_content' in data:
            return {
                "en_title": data["en_title"].strip(),
                "en_content": data["en_content"].strip()
            }
        # 케이스2. Title/Description (json으로 온 경우)
        if 'Title' in data and 'Description' in data:
            return {
                "en_title": data["Title"].strip(),
                "en_content": data["Description"].strip()
            }
    except Exception:
        pass

    # 2. 마크다운/텍스트 라벨에서 추출 (다국어 라벨 대응)
    title_match = re.search(r'(?:\*\*|__)?(?:en_title|title|제목)[\s\(\)A-Za-z가-힣]*[:：]\s*(.+)', raw, re.I)
    content_match = re.search(r'(?:\*\*|__)?(?:en_content|content|내용|description)[\s\(\)A-Za-z가-힣]*[:：]\s*([\s\S]+?)(?:\n[-*#]{3,}|\n$|$)', raw, re.I)

    title = title_match.group(1).strip() if title_match else None
    content = content_match.group(1).strip() if content_match else None

    # 3. 둘 중 하나라도 있으면 무조건 반환
    if title or content:
        return {
            "en_title": title or "[No Title]",
            "en_content": content or "[No Content]"
        }

    # 4. 진짜 못 찾으면 그냥 통째로 내용에 넣기
    return {
        "en_title": "[Raw English]",
        "en_content": raw.strip()
    }


def translate_post(user_id: int, title_kr: str, content_kr: str):
    print("=== translate_post진입 ===")
    print("title_kr:", repr(title_kr))
    print("content_kr:", repr(content_kr))
    try:
        prompt = TRANSLATE_PROMPT.format(title=title_kr, content=content_kr)
    except Exception as e:
        print("TRANSLATE_PROMPT format 에러:", e)
        raise
    print("=== translate_post진입1 ===")
    raw = call_chatgpt(user_id=user_id, system_prompt="", user_prompt=prompt, chat_history=[])
    print("=== GPT RAW RESPONSE ===")
    print(raw)
    print("========================")
    result = parse_gpt_response_to_json(raw)
    title = result.get("en_title") or ""
    content = result.get("en_content") or ""
    if not title or not content:
        print("❌ 번역 KeyError 발생, result:", result)
    return title, content


def extract_title_content(gpt_resp: str):
    print("extract_title_content 진입")
    import re
    try:
        # 정규식 패턴 (혼종 포함)
        title_pattern = r"(?:\*\*|__)?\s*(제목|title)[\s\(\)A-Za-z가-힣]*[:：]\s*(.+)"
        content_pattern = r"(?:\*\*|__)?\s*(내용|content)[\s\(\)A-Za-z가-힣]*[:：]\s*([\s\S]+?)(?:\n[-*#]{3,}|\n$|$)"

        title_match = re.search(title_pattern, gpt_resp, re.I)
        content_match = re.search(content_pattern, gpt_resp, re.I)
        print("title_match:", title_match)
        print("content_match:", content_match)

        title_kr = title_match.group(2).strip() if title_match else ""
        content_kr = content_match.group(2).strip() if content_match else ""
        return title_kr, content_kr
    except Exception as e:
        print("extract_title_content 예외 발생:", e)
        print("gpt_resp 값:", repr(gpt_resp))
        # 에러가 나면 raw 텍스트 통째로 반환
        return "", ""

def extract_title_content_with_gpt(user_id: int, user_input: str) -> tuple:
    """
    GPT에게 '아래 텍스트에서 제목/내용을 최대한 자연스럽게 분리해줘.
    제목이 없으면 첫 문장을 제목으로, 나머지는 내용으로. 내용만 있으면 제목은 공백'
    """
    PROMPT = """
아래 입력에서 제목과 내용을 분리해 반드시 아래 한글 라벨로만 반환해줘.

제목: ...
내용: ...

- 라벨에 영어, 영문병기, 설명, 코드블럭, 마크다운 등 절대 넣지 마라.
- 라벨은 무조건 '제목:' '내용:'만 써라.
- 부가설명, 안내, 예시, 영문 라벨, (Title), (Content), 코드블럭, 별도 마크다운, --- 등도 절대 넣지 마라.
- 반환 예시 (형식 지켜라):
제목: 수제 비누 3종 세트
내용: 민감성 피부에도 쓸 수 있는 천연 비누입니다.

입력: {user_input}
"""    
    
    prompt = PROMPT.format(user_input=user_input)
    print("extract_title_content_with_gpt 진입")
    gpt_resp = call_chatgpt(user_id=user_id, system_prompt="", user_prompt=prompt, chat_history=[])
    print("gpt_resp repr:", repr(gpt_resp))

    print("extract_title_content 호출 직전")
    title_kr, content_kr = extract_title_content(gpt_resp)
    print("extract_title_content 호출 완료") 
    print("title_kr:", title_kr)
    print("content_kr:", content_kr)

    return title_kr, content_kr

class ChatbotService:
    print("✅ ChatbotService 클래스 로딩됨")
    def handle(self, db: Session, user_id: str, message: str) -> dict:
        save_chat_message(db, user_id, RoleEnum.user, message)
        add_chat_to_redis(user_id, "user", message)

        chat_history = get_chat_history(user_id)[:MAX_HISTORY]
        formatted_history = self.convert_to_gpt_format(chat_history)

        ctx_result = self.update_context_from_message(db, user_id, message)
        if isinstance(ctx_result, dict) and "response" in ctx_result:
            return ctx_result
        
        context = get_user_context(user_id)

        # Step6 완료
        if context.get("stage") == "step6":
            return self._handle_final_step(db, user_id)

        # Step5 게시 요청
        if context.get("stage") == "step5":
            print("🛠 Step5 진입 확인됨")
            return self._handle_post_request(db, user_id, message, context)

        # Step3 슬라이드 설명
        if context.get("stage") == "step3" and context.get("platform"):
            return self._handle_slide_step(db, user_id, context)

        # GPT 호출 처리
        if context.get("stage") == "step3":
            system_prompt = SYSTEM_PROMPT + "\n\n" + SLIDE_PROMPT
        else:
            system_prompt = SYSTEM_PROMPT

        gpt_response = call_chatgpt(
            user_id=user_id,
            system_prompt=system_prompt,
            user_prompt=message,
            chat_history=formatted_history
        )

        split_messages = split_slide_message(str(gpt_response))
        if not isinstance(split_messages, list):
            split_messages = [{"role": "assistant", "type": "text", "content": "죄송합니다. 오류가 발생했어요."}]

        for m in split_messages:
            if m["type"] == "text":
                save_chat_message(db, user_id, RoleEnum.assistant, m["content"])
                add_chat_to_redis(user_id, "assistant", m["content"])
                break

        return {
            "messages": split_messages,
            "context": get_user_context(user_id),
            "step": get_user_context(user_id).get("stage") or "start"
        }


    def _handle_final_step(self, db, user_id):
        msg = "게시가 완료되었습니다! 수고 많으셨어요 😊"
        save_chat_message(db, user_id, RoleEnum.assistant, msg)
        add_chat_to_redis(user_id, "assistant", msg)
        return {"messages": [{"role": "assistant", "type": "text", "content": msg}]}

    def _handle_post_request(self, db, user_id, message, context):
        msg = message.strip().lower()
        mapping = {"1": "domestic", "국내": "domestic", "2": "foreign", "해외": "foreign", "3": "both", "둘 다": "both"}
        target = next((v for k, v in mapping.items() if k in msg), None)
        if not target:
            err = "❌ 게시할 대상을 인식하지 못했습니다. (예: 1, 2, 3, 국내, 해외, 둘 다)"
            save_chat_message(db, user_id, RoleEnum.assistant, err)
            add_chat_to_redis(user_id, "assistant", err)
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
            msg = f"제목(영문): {context['translated_title']}\n내용(영문): {context['translated_content']}\n"
            msg += f"{'국내와 해외' if target=='both' else target} 게시 완료! 😊"
        else:
            msg = "❌ 게시글 등록 중 오류 발생"

        save_chat_message(db, user_id, RoleEnum.assistant, msg)
        add_chat_to_redis(user_id, "assistant", msg)
        return {"messages": [{"role": "assistant", "type": "text", "content": msg}]}

    def _handle_slide_step(self, db, user_id, context):
        result = get_slide_message_gpt(user_id, context["platform"], context.get("slide_idx", 0))
        if not result:
            return {"messages": [{"role": "assistant", "type": "text", "content": "슬라이드 불러오기 오류"}]}

        slide_index = context.get("slide_idx", 0) + 1
        save_chat_message(db, user_id, RoleEnum.assistant, result["text"])
        add_chat_to_redis(user_id, "assistant", result["text"])

        return {
            "messages": [
                {"role": "assistant", "type": "image", "content": result["image"]},
                {"role": "assistant", "type": "text", "content": result["text"] + "\n\n👉 다음으로 넘어가려면 '다음'이라고 입력해 주세요!"}
            ]
        }


    def update_context_from_message(self, db, user_id: str, message: str):
        context = get_user_context(user_id)
        print(f"{context} : 확인")
        msg = message.strip().lower()

        if context.get("stage") == "step3" and msg in ["다음", "next", "다음 슬라이드", "넘겨줘"]:
            current = context.get("slide_idx", 0)

            if is_last_slide(context.get("platform"), current):
                print("📘 슬라이드 마지막 도달 → step4로 이동")
                update_user_context(user_id, {"stage": "step4", "slide_idx": 0})
            else:
                update_user_context(user_id, {"slide_idx": current + 1})
                print(f"📸 슬라이드 {current + 1}로 이동")
            return

        # ✅ step3: 슬라이드 종료 문장 명시적으로 말한 경우
        if context.get("stage") == "step3":
            lower_msg = message.lower()
            if "슬라이드" in lower_msg and any(kw in lower_msg for kw in ["끝", "종료", "다음", "넘어", "그만"]):
                update_user_context(user_id, {"stage": "step4", "slide_idx": 0})
                print("📘 슬라이드 종료 문장 감지 → step4로 이동")
                return

        # ✅ step4 (제목+내용 입력 처리)
        # Step4: 판매글 입력 → 번역 → "이대로 게시할까요?" 안내, stage=step5
        if context.get("stage") == "step4" and ("제목" in message or "내용" in message):
            try:
                print("🔎 제목/내용 자동 추출")
                title_kr, content_kr = extract_title_content_with_gpt(user_id, message)
                if not (title_kr or content_kr):
                    raise ValueError("제목/내용 둘 다 추출 실패")
            except Exception as e:
                err = f"❌ 판매글에서 제목/내용을 추출하지 못했어요. 다시 입력해 주세요! ({e})"
                save_chat_message(db, user_id, RoleEnum.assistant, err)
                add_chat_to_redis(user_id, "assistant", err)
                return {"messages": [{"role": "assistant", "content": err}]}

            # 영어 번역
            try:
                print("🔵 GPT 번역 중 …")
                en_title, en_content = translate_post(user_id, title_kr, content_kr)
            except Exception as e:
                err = "❌ 번역 중 오류가 발생했어요. 다시 시도해 주세요!"
                save_chat_message(db, user_id, RoleEnum.assistant, err)
                add_chat_to_redis(user_id, "assistant", err)
                return {"messages": [{"role": "assistant", "content": err}]}

            # 컨텍스트 저장 및 안내
            update_user_context(user_id, {
                "post_title_kr": title_kr,
                "post_content_kr": content_kr,
                "translated_title": en_title,
                "translated_content": en_content,
            })
            reply = (
                f"✅ 번역이 완료되었어요!\n\n"
                f"📌 [한글 제목] {title_kr}\n🌍 [영문 제목] {en_title}\n\n"
                f"📌 [한글 내용] {content_kr}\n🌍 [영문 내용] {en_content}\n\n"
                "👉 이대로 게시할까요? (네/아니요)"
            )
            save_chat_message(db, user_id, RoleEnum.assistant, reply)
            add_chat_to_redis(user_id, "assistant", reply)
            return {"messages": [{"role": "assistant", "content": reply}]}
        
        # ✅ step4: '이대로 게시할까요?'에 대한 답변 처리
        if context.get("stage") == "step4" and ("국내" in msg or "해외" in msg or "둘 다" in msg):
            domestic_list = ["국내", "1", "domestic"]
            foreign_list = ["해외", "2", "foreign"]
            both_list = ["둘 다", "3", "both"]

            if any(k in msg for k in domestic_list):
                update_user_context(user_id, {"stage": "step5"})
                return  # handle()에서 step5 진입 처리됨

            elif any(k in msg for k in foreign_list):                
                update_user_context(user_id, {"stage": "step5"})
                return  # handle()에서 step5 진입 처리됨
            elif any(k in msg for k in both_list):                
                update_user_context(user_id, {"stage": "step5"})
                return  # handle()에서 step5 진입 처리됨    

        # Step5: "네/아니요" 대답 → 자동 게시 or 취소
        if context.get("stage") == "step5":
            msg_norm = msg.replace(' ', '')
            if msg_norm in ["네", "yes", "y"]:
                # 국내+해외 자동 게시
                update_user_context(user_id, {"post_target": "both", "stage": "step6"})
                success = asyncio.run(post_to_spring_board(
                    user_id=int(user_id),
                    platform=context.get("platform", ""),
                    title=context.get("post_title_kr", ""),
                    content=context.get("post_content_kr", ""),
                    translated_title=context.get("translated_title", ""),
                    translated_content=context.get("translated_content", ""),
                    target="both"
                ))
                if success:
                    res_msg = (
                        f"✅ 게시 완료!\n"
                        f"- 제목(영문): {context['translated_title']}\n"
                        f"- 내용(영문): {context['translated_content']}\n"
                        f"👉 국내와 해외 게시판에 모두 등록했어요!"
                    )
                else:
                    res_msg = "❌ 게시글 등록 중 오류가 발생했어요."
                save_chat_message(db, user_id, RoleEnum.assistant, res_msg)
                add_chat_to_redis(user_id, "assistant", res_msg)
                return {"messages": [{"role": "assistant", "content": res_msg}]}
            else:
                # 취소
                update_user_context(user_id, {"stage": "start"})
                cancel_msg = "게시가 취소되었습니다. 처음부터 다시 시작할 수 있습니다."
                save_chat_message(db, user_id, RoleEnum.assistant, cancel_msg)
                add_chat_to_redis(user_id, "assistant", cancel_msg)
                return {"messages": [{"role": "assistant", "content": cancel_msg}]}


        # ✅ 처음 시작: item 입력
        if context.get("stage") in [None, "start"] or "item" not in context:
            update_user_context(user_id, {"item": message, "stage": "step1"})
            print("대화 시작 → step1 진입")
            return

        # ✅ step1 → step2: country 저장
        if context.get("stage") == "step1" or "country" not in context:
            update_user_context(user_id, {"country": message, "stage": "step2"})
            print("🧭 초기 품목 입력 → step1 진입")
            return

        if context.get("stage") == "step4" or "country" not in context:
            update_user_context(user_id, {"country": message, "stage": "step2"})
            print("🧭 초기 품목 입력 → step1 진입")
            return

        # ✅ step2 → step3: platform 선택
        if context.get("stage") == "step2" or "platform" not in context:
            print("🌍 국가 선택 완료 → step3 진입")
            platform = None
            if "amazon" in msg or "아마존" in msg or msg == "1":
                platform = "amazon"
            elif "shopee" in msg or "쇼피" in msg or msg == "2":
                platform = "shopee"

            if platform:
                update_user_context(user_id, {"platform": platform, "stage": "step3", "slide_idx": 0})
                print(f"🛒 플랫폼 선택 → {platform} / step3 슬라이드 진입")
            return

        # ✅ step6 → 다시 등록 요청 시 step5로 복귀
        if context.get("stage") == "step6" and any(kw in msg for kw in ["다시", "재등록", "등록해줘", "한 번 더"]):
            if context.get("post_title_kr") and context.get("post_content_kr"):
                update_user_context(user_id, {"stage": "step5"})
                print("🔁 게시 재등록 요청 감지 → step5로 복귀")
            return

    def build_prompt(self, context: dict, history: list, message: str, slide_text: str = "") -> str:
        # 🔵 원래는 전체 prompt 만들어서 return 했지만
        # ✅ 이제는 "GPT 시스템 지시문"만 반환하면 됨
        # 참고로 slide_text는 system_prompt 안에서 붙일 수 있음

        # Step1 국가 추천 → 슬라이드 텍스트 붙이기
        if context.get("stage") == "step1" and "item" in context:
            slide_text += self.get_step1_country_list_text(context["item"])

        # Step2 플랫폼 추천
        elif context.get("stage") == "step2" and "country" in context:
            slide_text += self.get_step2_platform_text(context["country"])

        return SYSTEM_PROMPT + "\n\n" + slide_text

    def get_step1_country_list_text(self, item: str) -> str:
        results = get_top_country_details(item)
        if not results:
            return "\n\n❗ 해당 품목에 대한 수출 데이터를 찾을 수 없어요. 다시 입력해 주세요."

        lines = [
            f"{r['순위']}. {r['국가']} ({r['성공확률']}%) - {r['추천이유']}"
            for r in results
        ]
        text = "\n".join(lines)

        return f"\n\n📦 [수출 유망 국가 TOP 20 - {item} 기준]\n{text}\n\n💬 관심 있는 국가를 선택해 주세요!"

    def get_step2_platform_text(self, country: str) -> str:
        country = country.strip()

        is_shopee = country in SHOPEE_COUNTRIES
        is_amazon = True  # Amazon은 모든 국가 허용

        platforms = []
        if is_amazon:
            platforms.append("Amazon")
        if is_shopee:
            platforms.append("Shopee")

        # 플랫폼 설명 문구 생성
        if not platforms:
            return f"{country}에서는 현재 추천할 수 있는 대표적인 플랫폼이 없습니다. 다른 국가를 선택해보시는 것도 좋아요."

        if len(platforms) == 1:
            return f"{country}에서는 **{platforms[0]}** 플랫폼을 통해 판매하시는 것이 적절합니다. 이 플랫폼의 특징과 사용법을 알려드릴게요!"
        else:
            return f"{country}에서는 **Amazon**과 **Shopee** 두 플랫폼 모두 활용하실 수 있어요. 각각의 특징을 비교하고 선택하시면 좋겠습니다 😊"

    @staticmethod
    def convert_to_gpt_format(history):
        formatted = []
        for h in history:
            if isinstance(h, dict):
                formatted.append({
                    "role": h.get("role"),
                    "content": h.get("content")
                })
            else:  # ChatbotMessage 객체 (RDB)
                formatted.append({
                    "role": h.role.value if hasattr(h.role, "value") else h.role,
                    "content": h.content
                })
        return formatted
