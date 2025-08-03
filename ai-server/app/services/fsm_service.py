# fsm_service.py

def next_stage(current: str, intent: str, message: str) -> str:
    """
    현재 상태와 분류된 intent에 따라 다음 stage 반환
    """
    if current in [None, "", "start"]:
        return "step1"

    elif current == "step1":
        if intent in ["item", "item_input", "title_input"]:
            return "step2"
        return "step1"

    elif current == "step2":
        return "step3"

    elif current == "step3":
        if intent == "next_slide":
            return "step4"
        return "step3"

    elif current == "step4":
        if intent == "title_input":
            return "step5"
        elif intent == "cancel":
            return "start"
        return "step4"

    elif current == "step5":
        if intent == "confirm_posting":
            return "step6"
        return "step5"

    elif current == "step6":
        if any(kw in message for kw in ["다시", "재등록", "한 번 더"]):
            return "step5"
        return "step6"

    return current
