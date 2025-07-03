from pydantic import BaseModel
from typing import Optional, Any

class ChatResponse(BaseModel):
    step: str
    message: str
    data: Optional[Any] = None
