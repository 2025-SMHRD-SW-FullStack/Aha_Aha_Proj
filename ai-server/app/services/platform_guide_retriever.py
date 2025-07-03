# app/services/platform_guide_retriever.py
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
import os

embedding = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))
CHROMA_PATH = "app/chroma_db/amazon_guide"

db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding)

def get_amazon_guide_snippets(query: str, k: int = 3) -> list[str]:
    results = db.similarity_search(query, k=k)
    return [doc.page_content for doc in results]
