from pathlib import Path
from typing import List
import fitz  # PyMuPDF

def load_pdf_chunks(pdf_path: str) -> List[str]:
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()

    # 문단 기준 분리
    chunks = [chunk.strip() for chunk in text.split("\n\n") if chunk.strip()]
    return chunks
