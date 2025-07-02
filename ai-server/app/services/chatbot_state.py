# app/core/chatbot_state.py

import redis
import json
import os
from typing import Dict, Any

# ✅ 환경 변수에서 Redis 설정 불러오기
redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    decode_responses=True  # 문자열 자동 디코딩
)

# ✅ 유저별 상태 키 정의
def _context_key(user_id: str) -> str:
    return f"user_context:{user_id}"

def _chat_context_key(user_id: str) -> str:
    return f"chat_context:{user_id}"

DEFAULT_CONTEXT = {
    "stage": "start",      # start → item → country → platform → guide → translate → done
    "item": None,
    "country": None,
    "platform": None,
    "page": 1
}

# ✅ 유저 컨텍스트 불러오기
def get_user_context(user_id: str) -> Dict[str, Any]:
    key = _context_key(user_id)
    value = redis_client.get(key)
    if value:
        return json.loads(value)
    else:
        redis_client.set(key, json.dumps(DEFAULT_CONTEXT))
        return DEFAULT_CONTEXT.copy()

# ✅ 유저 컨텍스트 업데이트
def update_user_context(user_id: str, updates: Dict[str, Any]):
    key = _context_key(user_id)
    context = get_user_context(user_id)
    context.update(updates)
    redis_client.set(key, json.dumps(context))


# ✅ 최근 대화 기록 Redis에 저장 (push)
def append_chat_message(user_id: str, role: str, content: str, max_length: int = 10):
    key = _chat_context_key(user_id)
    redis_client.lpush(key, json.dumps({"role": role, "content": content}))
    redis_client.ltrim(key, 0, max_length - 1)  # 가장 최근 10개만 유지


# ✅ Redis에 저장된 대화 기록 불러오기
def get_chat_history(user_id: str) -> list[dict]:
    key = _chat_context_key(user_id)
    messages = redis_client.lrange(key, 0, -1)
    return [json.loads(msg) for msg in reversed(messages)]  # 최신순 → 오래된 순으로 변환


# ✅ DB에서 불러온 기록 Redis에 복사
def load_chat_history_to_redis(user_id: int, messages: list[dict]):
    key = _chat_context_key(user_id)
    redis_client.delete(key)
    for msg in reversed(messages[-10:]):  # 최근 10개
        redis_client.rpush(key, json.dumps(msg))
