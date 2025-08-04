# 🌍 GlobalGo – AI 기반 수출 추천 플랫폼

**GlobalGo**는 소상공인을 위한 AI 수출 지원 플랫폼입니다.  
GPT 기반 챗봇과 실시간 추천 기능을 통해, 누구나 손쉽게 글로벌 시장에 진출할 수 있도록 돕습니다.

---

## 📌 프로젝트 소개

- 품목만 입력하면, **관세청 데이터 기반** AI가 수출 유망국가를 자동 추천  
- 추천된 국가에 따라 **이커머스 플랫폼(Amazon, Shopee)** 가이드 제공  
- 사용자가 입력한 판매글을 AI가 영어로 번역하고, **국내·해외 게시판에 자동 등록**  
- 모든 과정은 챗봇 또는 페이지 양쪽에서 지원  

---

## 🔧 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React, Vite, CSS Modules |
| 백엔드 | Spring Boot, Spring Security + JWT, MySQL |
| AI 서버 | FastAPI, OpenAI API, ChromaDB, Redis |
| 인프라 | AWS EC2, S3, Route53, GitHub Actions |

---

## 🧩 주요 기능

- ✅ **HS 코드 기반 수출 유망국가 추천** (AI + 공공데이터 기반)
- ✅ **이커머스 플랫폼 가이드 제공** (슬라이드 + 챗봇)
- ✅ **AI 번역 + 자동 게시글 등록** (국내/해외)
- ✅ **챗봇 기반 흐름**으로 단계별 수출 도우미 제공
- ✅ **JWT 기반 인증** 및 사용자 세션 유지
- ✅ **React + Spring 분리형 서버 구조**

---

## 📂 프로젝트 구조

```bash
globalgo/
├── front-server/     # 프론트엔드 (React)
├── api-server/       # 백엔드 (Spring Boot)
└── ai-server/        # AI 서버 (FastAPI)
```

---

## ▶️ 실행 방법

### 1. 프론트엔드
```bash
cd front-server
npm install
npm run dev
```

### 2. 백엔드(Spring Boot)
```bash
cd api-server
./gradlew bootRun
```

### 3. AI 서버(FastAPI)
```bash
cd ai-server
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📜 라이선스

본 프로젝트는 MIT 라이선스를 따릅니다.

---

## 📎 자세히 보기

👉 [프로젝트 노션 페이지 바로가기](https://www.notion.so/Global-Go-22ab96f833fd80b28537eeb371b30eba)  
_(기획서, 산출물, 데모 영상, 개발 흐름 등 상세 내용 포함)_
