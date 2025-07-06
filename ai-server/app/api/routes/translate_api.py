from fastapi import APIRouter, Request
from app.services.translate_core import gpt_translate_fields_dict

router = APIRouter()

@router.post("/translate")
async def translate_api(request: Request):
    data = await request.json()   
    result = gpt_translate_fields_dict(data)
    return result