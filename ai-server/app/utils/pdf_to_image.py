import os
from pdf2image import convert_from_path
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()
POPPLER_PATH = os.getenv("POPPLER_PATH")

def convert_pdf_to_images(pdf_path: str, output_dir: str):
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    images = convert_from_path(pdf_path, dpi=200, poppler_path=POPPLER_PATH)

    saved_paths = []
    for i, image in enumerate(images):
        image_path = os.path.join(output_dir, f"slide_{i+1}.png")
        image.save(image_path, "PNG")
        saved_paths.append(image_path)

    return saved_paths
