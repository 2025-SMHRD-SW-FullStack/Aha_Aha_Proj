import chromadb
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def setup_vector_database(hscode_df, collection_name="hscode_items", chunk_size=1000, force_reset=False):
    import time
    db_client = chromadb.PersistentClient(path="./chroma_db")

    # ✅ 필요 시 강제 삭제 (개발 중 디버깅용)
    if force_reset:
        try:
            db_client.delete_collection(name=collection_name)
            print(f"🗑 컬렉션 '{collection_name}' 삭제 완료")
        except:
            print(f"⚠ 컬렉션 '{collection_name}' 없음 또는 삭제 실패")

    # ✅ 이미 존재하는 경우 그대로 사용
    if collection_name in [c.name for c in db_client.list_collections()]:
        print(f"📦 기존 컬렉션 '{collection_name}' 재사용")
        return db_client.get_collection(name=collection_name)

    # ✅ 새 컬렉션 생성
    collection = db_client.create_collection(name=collection_name)
    print(f"✅ 새 컬렉션 '{collection_name}' 생성")

    # 🔍 임베딩 대상 데이터 준비
    hscode_df = hscode_df.dropna(subset=['한글품목명'])

    docs = hscode_df['한글품목명'].tolist()
    metas = [{'hscode': str(code), 'item_name': name} for code, name in zip(hscode_df['품목번호'], hscode_df['한글품목명'])]
    ids = [f"id_{i}" for i in range(len(docs))]

    print(f"🧠 전체 임베딩 요청 문서 수: {len(docs)}")

    # ✅ 임베딩 요청 (chunk 단위)
    for i in range(0, len(docs), chunk_size):
        chunk_docs = docs[i:i+chunk_size]
        chunk_ids = ids[i:i+chunk_size]
        chunk_metas = metas[i:i+chunk_size]

        embeddings = client.embeddings.create(
            input=chunk_docs,
            model="text-embedding-3-small"
        ).data

        collection.add(
            embeddings=[e.embedding for e in embeddings],
            documents=chunk_docs,
            metadatas=chunk_metas,
            ids=chunk_ids
        )

        print(f"✅ {i}~{i+chunk_size} 임베딩 완료")
        time.sleep(0.5)

    print("✅ 벡터DB 최종 등록 문서 수:", len(docs))
    print("📄 샘플 품목명 5개:", docs[:5])
    print("📄 샘플 메타데이터 5개:", metas[:5])

    return collection

def search_similar_item(user_input: str, top_k=1) -> str | None:
    print("🔍 벡터DB 유사 품목 검색 진입")
    db_client = chromadb.PersistentClient(path="./chroma_db")
    collection = db_client.get_collection(name="hscode_items")

    # 🔥 기존 벡터 컬렉션이 ada-002 (1536차원)이므로, 동일한 임베딩 차원 사용
    embedding = client.embeddings.create(
        input=[user_input],
        model="text-embedding-ada-002"
    ).data[0].embedding

    result = collection.query(
        query_embeddings=[embedding],
        n_results=top_k
    )

    return result["metadatas"][0][0]["item_name"]

def find_relevant_hs_codes_from_vector_db(item_name: str, collection) -> list:
    """벡터 DB를 사용하여 의미적으로 가장 유사한 HS코드를 찾아냅니다."""
    if not collection: return []
    query_embedding = client.embeddings.create(input=[item_name], model="text-embedding-3-small").data[0].embedding
    results = collection.query(query_embeddings=[query_embedding], n_results=5)
    hs_codes = set()
    if results['metadatas'] and results['metadatas'][0]:
        for metadata in results['metadatas'][0]:
            hscode = str(metadata.get('hscode', ''))
            hs_codes.add(hscode[:2].zfill(2))
    return list(hs_codes)