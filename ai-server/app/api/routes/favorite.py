from fastapi import APIRouter, Body
from app.services.cache import add_favorite, remove_favorite

router = APIRouter()

@router.post("/favorite/add")
def favorite_create(user_id: int = Body(...), product_item_id: int = Body(...)):
    add_favorite(user_id, product_item_id)
    return {"success": True}

@router.post("/favorite/remove")
def favorite_delete(user_id: int = Body(...), product_item_id: int = Body(...)):
    remove_favorite(user_id, product_item_id)
    return {"success": True}