# 🌐 Global Go – 소상공인을 위한 AI 수출 어드바이저

![Global Go 로고](./Global_Go/산출문서/Global_Go 로고.png)

---

## 🧠 **Overview**

**Global Go**는 소상공인의 수출 진입 장벽을 낮추기 위해 설계된 AI 기반 수출 어드바이저입니다.

- 품목을 입력하면 HS 코드 기반으로 유망 수출국을 AI가 추천하고,
- 수출 국가에 따라 적합한 이커머스 플랫폼(Amazon, Shopee)을 추천하며,
- 플랫폼별 판매 등록 가이드를 이미지/설명으로 제공하고,
- 사용자 입력을 번역해 국내/해외 게시판에 **자동 게시**하는 기능까지 지원합니다.

---

## 🧑‍🤝‍🧑 팀원 소개 및 역할

| 이름 | 역할 | GitHub |
|------|------|--------|
| 🧑‍💼 유준선 (팀장) | 전체 시스템 설계, 백엔드 API, AI 서버, 챗봇 구현, DB 설계 | [github.com/dbwnstjs4862](https://github.com/dbwnstjs4862) |
| 👩‍💻 최효정 | 프론트엔드 개발, 화면 설계, UX 설계, 번역 기능 UI | [github.com/hyojung22](https://github.com/hyojung22) |
| 👩‍💻 유은지 | 회원가입/로그인, JWT 인증, 마이페이지 구현 | [github.com/ryuenuji](https://github.com/ryuenuji) |
| 👨‍💻 최호철 | 게시판 구현, 게시글 등록/조회 API, 즐겨찾기 기능 | [github.com/choi-ho-cheol](https://github.com/choi-ho-cheol) |

---

## 🚀 배포 링크
- [http://globalgo.it.com:5173](http://globalgo.it.com:5173)

---

## 📂 GitHub Repository
- [https://github.com/2025-SMHRD-SW-FullStack/Aha_Aha_Proj](https://github.com/2025-SMHRD-SW-FullStack/Aha_Aha_Proj)

---

## 🗂️ 프로젝트 산출물

- 📄 기획서: `기획서_Global_Go___소상공인_AI_수출_어드바이저.hwp`
- 📄 요구사항정의서: `Global_Go_요구사항정의서_AhaAha_250704.hwp`
- 📄 DB 요구사항분석서: `Global_Go_DB_요구사항분석서_AhaAha_250707.hwp`
- 📄 테이블 명세서: `Global_Go_테이블_명세서_AhaAha_250707.hwp`
- 📄 화면설계서(PDF): `250708_AhaAha화면설계서_최종.pdf`

---

## 🧱 시스템 아키텍처

![아키텍처](./assets/architecture.jpg)

---

## 📆 프로젝트 기간
> `2025.06.26 ~ 2025.07.08`

---

## 📹 시연 영상
- [YouTube 시연 영상 보기](https://youtu.be/jIDPu30g56g)

---

## 🛠 주요 기능

### 🏠 메인 페이지
- 전체 기능에 대한 진입 포인트 역할
- 품목 → 플랫폼 → 게시글 → 챗봇 순으로 가이드

### 🔐 회원가입 및 로그인
- Spring Security + JWT 기반 인증
- Google, Kakao 등 소셜 로그인 지원

### 🔍 품목 분석 페이지
- HS 코드 유사도 기반 AI 추천
- 2025년도 수출 실적 분석 기반 국가 TOP 20 예측

### 🛒 판매 등록 가이드
- Amazon / Shopee 중 선택
- 슬라이드 방식의 단계별 등록 방법 안내
- 입력값 번역 기능 포함

### 📦 상품 리스팅
- 사용자가 작성한 정보를 바탕으로 게시글 자동 등록
- 국내 전시관 / 해외 전시관 게시글 구분

### 🤖 챗봇 페이지
- 전 프로세스를 챗봇으로 한 번에 수행 가능
- 상태 기반 대화 흐름 유지 (step1~step6)
- 슬라이드 안내, 번역, 자동 등록까지 전부 챗봇에서 처리

### 👤 마이 페이지
- 내 정보, 회사 정보, 즐겨찾기, 게시글 목록 제공

---

## 🔎 WBS

![WBS](./assets/wbs.png)

---

## 📁 기술 스택

- **Frontend**: React + Vite + Axios + CSS Modules
- **Backend**: Spring Boot + Spring Security + JPA + MySQL + Redis
- **AI 서버**: FastAPI + OpenAI GPT-4o + Chroma Vector DB
- **Auth**: JWT + OAuth2(Google, Kakao)
- **Infra**: AWS EC2 + Route53 + Linux 배포

---

## ✅ 구현 흐름 요약

```plaintext
1. 품목 입력 → AI 기반 국가 추천
2. 국가 선택 → 플랫폼 추천 (Amazon, Shopee)
3. 플랫폼 선택 → 단계별 등록 가이드 안내
4. 판매글 입력 → 영어 번역
5. 자동 게시 여부 선택 → 국내/해외 등록
6. 마이페이지에서 게시글 확인 및 관리
