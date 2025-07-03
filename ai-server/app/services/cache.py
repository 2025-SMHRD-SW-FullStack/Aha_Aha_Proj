import mysql.connector
import os
import json

def save_search_result_to_db(item_name, result_dict):
    try:
        connection = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        cursor = connection.cursor()
        result_json = json.dumps(result_dict, ensure_ascii=False)
        query = """
            INSERT INTO product_sort (item_name, search_result)
            VALUES (%s, %s)
            ON DUPLICATE KEY UPDATE
                search_result = VALUES(search_result),
                search_time = CURRENT_TIMESTAMP
        """
        cursor.execute(query, (item_name, result_json))
        connection.commit()
        print(f"'{item_name}' 검색결과 DB 저장 완료!")
    except Exception as e:
        print(f"DB 저장 오류: {e}")
    finally:
        try: cursor.close(); connection.close()
        except: pass
        
def get_search_result_from_db(item_name):
    try:
        connection = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        cursor = connection.cursor(dictionary=True)
        query = "SELECT search_result, search_time FROM product_sort WHERE item_name = %s"
        cursor.execute(query, (item_name,))
        row = cursor.fetchone()
        if row:
            return json.loads(row['search_result'])
        return None
    except Exception as e:
        print(f"DB 캐시 조회 오류: {e}")
        return None
    finally:
        try: cursor.close(); connection.close()
        except: pass