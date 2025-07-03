from fastapi import HTTPException
import jwt
import os
from dotenv import load_dotenv
import base64

load_dotenv()

# ✅ .env에 정의된 Base64 인코딩된 JWT 시크릿 키 사용
raw_secret = os.getenv("JWT_SECRET")
if not raw_secret:
    raise RuntimeError("❌ JWT_SECRET 환경변수가 설정되지 않았습니다.")

try:
    # Spring에서 Base64로 인코딩했기 때문에 디코딩해서 사용해야 함
    SECRET_KEY = os.getenv("JWT_SECRET").encode()
except Exception:
    raise RuntimeError("❌ JWT_SECRET이 Base64 형식이 아닙니다.")

def verify_jwt_token(authorization: str) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="유효하지 않은 인증 헤더입니다.")

    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = int(payload.get("sub"))  # Spring에서는 subject(sub)에 userId 저장
        if not user_id:
            raise HTTPException(status_code=401, detail="토큰에 userId(sub)가 없습니다.")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="토큰이 만료되었습니다.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다.")
