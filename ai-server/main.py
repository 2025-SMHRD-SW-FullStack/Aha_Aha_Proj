from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.loader import load_all_data
from app.core.state import app_state
from app.api.routes import router as api_router
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    df_export, hscode_collection = load_all_data()

    print("📦 벡터DB 컬렉션 내 총 문서 수:", len(hscode_collection.get()["ids"]))

    app_state["df_export"] = df_export
    app_state["hscode_collection"] = hscode_collection
    yield
    app_state.clear()

app = FastAPI(lifespan=lifespan)

# ✅ 모든 라우터 일괄 등록 (routes.py에 등록된 모든 API 포함)
app.include_router(api_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)