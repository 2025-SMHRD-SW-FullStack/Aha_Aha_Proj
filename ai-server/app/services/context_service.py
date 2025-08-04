from app.core.redis_client import redis_client
import json

REDIS_PREFIX = "user_context:"
DEFAULT_CONTEXT = {"stage": "start"}


def get_user_context(user_id: str) -> dict:
    key = REDIS_PREFIX + str(user_id)
    data = redis_client.get(key)
    if data:
        try:
            return json.loads(data)
        except Exception:
            return DEFAULT_CONTEXT.copy()
    return DEFAULT_CONTEXT.copy()


def update_user_context(user_id: str, updates: dict):
    key = REDIS_PREFIX + str(user_id)
    context = get_user_context(user_id)
    context.update(updates)
    redis_client.set(key, json.dumps(context), ex=60 * 60 * 3)  # 3시간 TTL


def reset_user_context(user_id: str):
    key = REDIS_PREFIX + str(user_id)
    redis_client.delete(key)
