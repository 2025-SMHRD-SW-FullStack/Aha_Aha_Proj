import mysql.connector
import os
import json

with open('hscode_map.json', encoding='utf-8') as f:
    hscode_map = json.load(f)

def save_search_result_to_db(item_name: str, result_dict: dict):
    """
    - 품목명(item_name)과 일치하는 HS코드가 있으면 product_item.code에 자동 저장
    - 신규 품목이면 code값도 함께 INSERT
    - result_dict는 기존 로직과 동일
    """
    item_name = item_name.strip()
    
    try:
        conn = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        cur = conn.cursor()
        # 1. product_item에서 품목명 확인
        cur.execute("SELECT id, code FROM product_item WHERE name = %s", (item_name,))
        row = cur.fetchone()
        hs_code = hscode_map.get(item_name.strip(), '')  # 매핑 없으면 ''(빈값)

        if row:
            item_id, current_code = row
            # code가 비어 있으면 자동 업데이트
            if (current_code is None or current_code == '') and hs_code:
                cur.execute("UPDATE product_item SET code = %s WHERE id = %s", (hs_code, item_id))
                conn.commit()
        else:
            # 신규 품목은 code까지 함께 저장
            cur.execute("INSERT INTO product_item (name, code) VALUES (%s, %s)", (item_name, hs_code))
            item_id = cur.lastrowid

        # (이하 product_sort 등 기존 로직과 동일)
        table_data = result_dict.get('tableData', [])
        params = []
        for rec in table_data:
            params.append((
                item_id,
                item_name,
                rec['country'],
                rec['rank'],
                rec['recommendationScore'],
                rec['key_factor']
            ))

        if not params:
            print(f"'{item_name}' tableData가 비어있어 저장하지 않음.")
            return

        upsert_sql = """
        INSERT INTO product_sort
            (product_item_id, product_item_name, country, `rank`, percent, reason)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            `rank` = VALUES(`rank`),
            percent = VALUES(percent),
            reason = VALUES(reason)
        """
        cur.executemany(upsert_sql, params)
        conn.commit()
        print(f"'{item_name}' 검색결과 product_sort 저장/업데이트 완료!")
    except Exception as e:
        print(f"DB 저장 오류: {e}")
    finally:
        try: cur.close(); conn.close()
        except: pass
        
def get_search_result_from_db(item_name: str):
    item_name = item_name.strip()
    try:
        conn = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        cur = conn.cursor(dictionary=True)
        # 1) product_item_id 찾기
        cur.execute("SELECT id FROM product_item WHERE name = %s ", (item_name,))
        row = cur.fetchone()
        if not row:
            return None
        item_id = row["id"]

        # 2) product_sort 결과 모두 읽기
        cur.execute(
            "SELECT percent, reason, country, `rank`"
            "FROM product_sort WHERE product_item_id = %s ORDER BY `rank` ASC",(item_id,)
        )
        rows = cur.fetchall()
        if not rows:
            return None

        tableData = [
            {"rank": r["rank"], "country": r["country"], "recommendationScore": r["percent"], "key_factor": r["reason"]}
            for r in rows
        ]

        return {
            "pagination": {"page": 1, "size": len(tableData), "total_items": len(tableData)},
            "topCountryData": tableData[0] if tableData else None,
            "tableData": tableData
        }
    except Exception as e:
        print(f"DB 캐시 조회 오류: {e}")
        return None
    finally:
        try: cur.close(); conn.close()
        except: pass

def add_favorite(user_id: int, product_item_id: int):
    try:
        conn = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        cur = conn.cursor()
        sql = """
        INSERT INTO favorite_product (user_id, product_item_id)
        VALUES (%s, %s)
        ON DUPLICATE KEY UPDATE created_at = NOW()
        """
        cur.execute(sql, (user_id, product_item_id))
        conn.commit()
        print(f"즐겨찾기 등록 성공! user_id={user_id}, product_item_id={product_item_id}")
    except Exception as e:
        print(f"즐겨찾기 저장 오류: {e}")
    finally:
        try: cur.close(); conn.close()
        except: pass
        
def remove_favorite(user_id: int, product_item_id: int):
    """
    즐겨찾기 해제(삭제) 함수.
    - 해당 유저가 지정한 품목에 대해 즐겨찾기한 내역을 삭제.
    """
    import mysql.connector
    import os

    try:
        conn = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        cur = conn.cursor()
        sql = """
        DELETE FROM favorite_product
        WHERE user_id = %s AND product_item_id = %s
        """
        cur.execute(sql, (user_id, product_item_id))
        conn.commit()
        print(f"[즐겨찾기 해제] user_id={user_id}, product_item_id={product_item_id}")
    except Exception as e:
        print(f"[즐겨찾기 해제 오류] {e}")
    finally:
        try: cur.close(); conn.close()
        except: pass