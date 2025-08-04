def get_response_for_stage(stage: str, context: dict) -> str:
    item = context.get("item", "상품")
    country = context.get("country", "해당 국가")

    if stage == "step1":
        return "수출하고 싶은 품목이 무엇인가요? (예: 비누, 가방, 티셔츠 등)"

    elif stage == "step2":
        return f"{item}에 대해 수출 유망 국가를 추천해드릴게요. 어느 나라에 관심이 있으신가요?"

    elif stage == "step3":
        return f"{country}에서 사용할 수 있는 대표 이커머스 플랫폼을 소개해드릴게요."

    elif stage == "step4":
        return "판매글을 입력해 주세요!\n예: 제목: 여름 린넨 셔츠\n내용: 통기성이 좋고 시원한 셔츠입니다."

    elif stage == "step5":
        return "이대로 게시할까요? (예: 네 / 아니요)"

    elif stage == "step6":
        return "✅ 게시 완료! 수고 많으셨어요 😊"

    return "죄송해요, 입력을 이해하지 못했어요. 다시 한번 말씀해주시겠어요?"
