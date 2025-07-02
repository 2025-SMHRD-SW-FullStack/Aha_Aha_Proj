# app/core/chatbot_state.py

import redis
import json
import os
from typing import Dict, Any

# ✅ Redis 클라이언트 연결
try:
    redis_client = redis.Redis(
        host=os.getenv("REDIS_HOST", "localhost"),
        port=int(os.getenv("REDIS_PORT", 6379)),
        decode_responses=True  # 문자열 자동 디코딩
    )
    redis_client.ping()
    print("✅ Redis 연결 성공")
except Exception as e:
    print(f"❌ Redis 연결 실패: {e}")
    redis_client = None  # 이후 로직에서 연결 여부 확인용

# ✅ 유저별 상태 키 정의
def _context_key(user_id: str) -> str:
    return f"user_context:{user_id}"

def _chat_context_key(user_id: str) -> str:
    return f"chat_context:{user_id}"

DEFAULT_CONTEXT = {
    "stage": "start",
    "item": None,
    "country": None,
    "platform": None,
    "page": 1
}

# ✅ 유저 컨텍스트 불러오기
def get_user_context(user_id: str) -> Dict[str, Any]:
    if redis_client is None:
        print("⚠️ Redis 미연결 상태 - 기본 context 반환")
        return DEFAULT_CONTEXT.copy()
    try:
        key = _context_key(user_id)
        value = redis_client.get(key)
        if value:
            return json.loads(value)
        else:
            redis_client.set(key, json.dumps(DEFAULT_CONTEXT))
            return DEFAULT_CONTEXT.copy()
    except Exception as e:
        print(f"❌ Redis get_user_context 오류: {e}")
        return DEFAULT_CONTEXT.copy()

# ✅ 유저 컨텍스트 업데이트
def update_user_context(user_id: str, updates: Dict[str, Any]):
    if redis_client is None:
        print("⚠️ Redis 미연결 상태 - 업데이트 무시")
        return
    try:
        key = _context_key(user_id)
        context = get_user_context(user_id)
        context.update(updates)
        redis_client.set(key, json.dumps(context))
    except Exception as e:
        print(f"❌ Redis update_user_context 오류: {e}")

# ✅ 최근 대화 기록 Redis에 저장
def append_chat_message(user_id: str, role: str, content: str, max_length: int = 10):
    if redis_client is None:
        print("⚠️ Redis 미연결 상태 - 대화 기록 저장 무시")
        return
    try:
        key = _chat_context_key(user_id)
        redis_client.lpush(key, json.dumps({"role": role, "content": content}))
        redis_client.ltrim(key, 0, max_length - 1)
    except Exception as e:
        print(f"❌ Redis append_chat_message 오류: {e}")

# ✅ Redis 대화 기록 불러오기
def get_chat_history(user_id: str) -> list[dict]:
    if redis_client is None:
        print("⚠️ Redis 미연결 상태 - 대화 기록 없음 반환")
        return []
    try:
        key = _chat_context_key(user_id)
        messages = redis_client.lrange(key, 0, -1)
        return [json.loads(msg) for msg in reversed(messages)]
    except Exception as e:
        print(f"❌ Redis get_chat_history 오류: {e}")
        return []

# ✅ DB → Redis 히스토리 복사
def load_chat_history_to_redis(user_id: int, messages: list[dict]):
    if redis_client is None:
        print("⚠️ Redis 미연결 상태 - DB 기록 복사 무시")
        return
    try:
        key = _chat_context_key(user_id)
        redis_client.delete(key)
        for msg in reversed(messages[-10:]):
            redis_client.rpush(key, json.dumps(msg))
    except Exception as e:
        print(f"❌ Redis load_chat_history_to_redis 오류: {e}")


def add_chat_to_redis(user_id: str, role: str, content: str):
    append_chat_message(user_id, role, content)
