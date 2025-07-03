import os
from dotenv import load_dotenv

# ✅ .env 파일 로드
load_dotenv()


class Settings:
    # ✅ 필수 환경변수
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    API_SERVER_URL = os.getenv("API_SERVER_URL")
    JWT_SECRET = os.getenv("JWT_SECRET")
    DATABASE_URL = os.getenv("DATABASE_URL")

    # ✅ 선택적 (기본값 제공)
    POPPLER_PATH = os.getenv("POPPLER_PATH", "/usr/bin/poppler")
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))

    # ✅ 기타 기본값
    VECTOR_DB_DIR = os.getenv("VECTOR_DB_DIR", "chroma_db")
    EXPORT_DATA_PATH = os.getenv("EXPORT_DATA_PATH", "export_data_2025_clean.json")
    HS_CODE_PATH = os.getenv("HS_CODE_PATH", "hscode_data_2025.json")

    # ✅ 유효성 검사 (누락 시 실행 중단)
    @classmethod
    def validate(cls):
        missing = []
        for key in ["OPENAI_API_KEY", "API_SERVER_URL", "JWT_SECRET", "DATABASE_URL"]:
            if not getattr(cls, key):
                missing.append(key)
        if missing:
            raise ValueError(f"❌ 필수 환경 변수 누락: {', '.join(missing)}")


# ✅ 애플리케이션 전역에서 사용할 설정 객체
settings = Settings()
settings.validate()
