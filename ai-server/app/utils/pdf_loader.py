from PyPDF2 import PdfReader
from pdf2image import convert_from_path
import os
from dotenv import load_dotenv

load_dotenv()
POPPLER_PATH = os.getenv("POPPLER_PATH")

def convert_pdf_to_images(pdf_path: str, output_dir: str) -> list[str]:
    """
    PDF 파일을 이미지로 변환하고 파일 경로 리스트를 반환함.
    """
    os.makedirs(output_dir, exist_ok=True)

    images = convert_from_path(pdf_path, poppler_path=POPPLER_PATH)
    image_paths = []

    for i, page in enumerate(images):
        filename = os.path.join(output_dir, f"slide_{i + 1}.png")
        page.save(filename, "PNG")
        image_paths.append(filename)

    return image_paths

def extract_slides_text(pdf_path):
    reader = PdfReader(pdf_path)
    return [page.extract_text() for page in reader.pages]
