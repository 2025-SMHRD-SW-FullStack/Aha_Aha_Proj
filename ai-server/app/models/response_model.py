from pydantic import BaseModel
from typing import Any, Optional

class ChatResponse(BaseModel):
    step: str
    message: str
    data: Optional[Any]
