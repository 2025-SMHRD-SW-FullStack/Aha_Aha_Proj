from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routes import router as api_router
from app.core.loader import load_all_data
from app.core.state import app_state

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        print("🚀 FastAPI 앱 시작 중 - 데이터 로딩 시작")
        df_export, hscode_collection = load_all_data()
        print("📦 벡터DB 컬렉션 내 총 문서 수:", len(hscode_collection.get()["ids"]))

        app_state["df_export"] = df_export
        app_state["hscode_collection"] = hscode_collection
        yield
    except Exception as e:
        print("❌ lifespan 중 오류 발생:", str(e))
        raise e
    finally:
        app_state.clear()
        print("🧹 FastAPI 앱 종료 - 상태 초기화 완료")

app = FastAPI(lifespan=lifespan)

# ✅ CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ API 라우터 등록
app.include_router(api_router, prefix="/api")

# ✅ 정적 파일 경로 마운트
app.mount("/static", StaticFiles(directory="app/static"), name="static")
