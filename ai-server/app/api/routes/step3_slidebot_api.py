from fastapi import APIRouter, Query, Request
from fastapi.responses import JSONResponse
from app.services.step3_slidebot_service import (
    init_slides_from_pdf,
    handle_slide_interaction,
)
from app.utils.gpt import call_chatgpt

router = APIRouter(prefix="/api/slidebot")


@router.post("/start", tags=["슬라이드 챗봇"])
def start_slides():
    try:
        first_slide_path = init_slides_from_pdf(
            "app/pdf/amazon_guide.pdf", "app/pdf/slides"
        )
        return {"message": "슬라이드 초기화 완료", "first_slide_path": first_slide_path}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@router.post("/chat", tags=["슬라이드 챗봇"])
async def chat_with_slidebot(request: Request):
    print("✅ [FastAPI] POST /chat 호출됨")  # 디버깅

    try:
        data = await request.json()
        print("📦 받은 데이터:", data)  # 디버깅

        user_id = data.get("userId")
        message = data.get("message")

        if not user_id or not message:
            print("❗ userId 또는 message 없음")  # 디버깅
            return JSONResponse(status_code=400, content={"error": "userId 또는 message 누락"})

        response = handle_slide_interaction(user_id, message)
        print("✅ GPT 처리 결과:", response)  # 디버깅
        return response

    except Exception as e:
        print("❌ 예외 발생:", str(e))  # 디버깅
        return JSONResponse(status_code=500, content={"error": str(e)})


@router.post("/slide-gpt", tags=["슬라이드 챗봇"])
async def slide_gpt(request: Request):
    try:
        data = await request.json()
        prompt = data.get("prompt", "")
        if not prompt:
            return JSONResponse(status_code=400, content={"error": "프롬프트가 비어있습니다."})

        gpt_response = call_chatgpt(prompt)
        return {"message": gpt_response}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
