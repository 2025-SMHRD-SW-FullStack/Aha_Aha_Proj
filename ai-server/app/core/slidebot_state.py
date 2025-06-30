# user_id: 현재 페이지 번호 저장
user_slide_state = {}

def get_user_slide(user_id: str) -> int:
    return user_slide_state.get(user_id, 1)

def advance_user_slide(user_id: str):
    user_slide_state[user_id] = get_user_slide(user_id) + 1

def reset_user_slide(user_id: str):
    user_slide_state[user_id] = 1

# core/slidebot_state.py

class SlideBotState:
    def __init__(self):
        self.slide_paths: list[str] = []
        self.current_index: int = 0

    def set_slides(self, paths: list[str]):
        self.slide_paths = paths
        self.current_index = 0

    def get_current_slide(self) -> str:
        if 0 <= self.current_index < len(self.slide_paths):
            return self.slide_paths[self.current_index]
        return ""

    def move_next(self) -> str:
        if self.current_index + 1 < len(self.slide_paths):
            self.current_index += 1
        return self.get_current_slide()

    def is_finished(self) -> bool:
        return self.current_index >= len(self.slide_paths) - 1
