from app.utils.pdf_loader import extract_slides_text
from app.utils.pdf_to_image import convert_pdf_to_images
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class SlideChatbot:
    def __init__(self):
        self.slides = extract_slides_text("app/pdf/amazon_guide.pdf")
        self.images = convert_pdf_to_images("app/pdf/amazon_guide.pdf", "app/static/slides")
        self.index = 0

    def get_current_slide(self):
        return {
            "text": self.slides[self.index],
            "image_url": f"/static/slides/slide_{self.index+1}.png"
        }

    def get_slide_explanation(self):
        prompt = f"다음 아마존 가이드 슬라이드 내용을 초보자도 이해하기 쉽게 설명해줘:\n\n{self.slides[self.index]}"
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content.strip()

    def next_slide(self):
        if self.index < len(self.slides) - 1:
            self.index += 1
            return True
        return False

    def is_finished(self):
        return self.index >= len(self.slides) - 1
