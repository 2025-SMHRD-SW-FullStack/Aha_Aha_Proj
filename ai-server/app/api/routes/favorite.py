import mysql.connector
import os
from fastapi import APIRouter, Body, HTTPException
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

# 상품 이름을 기준으로 product_item_id를 반환하는 API
# @router.get("/products/getProductIdByName")
# def get_product_id_by_name(name: str):
#     # DB에서 product_item_name에 해당하는 product_item_id를 조회
#     product_item_id = get_product_id_by_name(name)
#     if not product_item_id:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return {"productItemId": product_item_id}


# 상품 이름을 기준으로 product_item_id를 반환하는 API
@router.get("/products/getProductIdByName")
def get_product_id_by_name(name: str):
    try:
        # DB 연결 설정
        conn = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        cur = conn.cursor()

        # product_item_name에 해당하는 product_item_id 조회
        cur.execute("SELECT id FROM product_item WHERE name = %s", (name,))
        row = cur.fetchone()

        if row:
            # product_item_id가 존재하는 경우 반환
            return {"productItemId": row[0]}
        else:
            # 품목이 존재하지 않는 경우 404 에러 반환
            raise HTTPException(status_code=404, detail="Product not found")
    except Exception as e:
        print(f"DB 조회 오류: {e}")
        # DB 에러 발생 시 500 Internal Server Error
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        try:
            cur.close()
            conn.close()
        except:
            pass
        
@router.get("/favorites/check")
def check_if_favorite(user_id: int, product_item_id: int):
    try:
        # DB 연결 설정
        conn = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        cur = conn.cursor()

        # 유저와 상품에 대한 즐겨찾기 여부 조회
        cur.execute(
            "SELECT EXISTS(SELECT 1 FROM favorite_product WHERE user_id = %s AND product_item_id = %s)",
            (user_id, product_item_id)
        )
        result = cur.fetchone()

        if result[0] == 1:
            # 즐겨찾기 존재
            return {"isFavorite": True}
        else:
            # 즐겨찾기 존재하지 않음
            return {"isFavorite": False}

    except Exception as e:
        print(f"DB 조회 오류: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    finally:
        try:
            cur.close()
            conn.close()
        except:
            pass