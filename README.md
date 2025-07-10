# **Global Go 로고**

![image.png](attachment:767e5433-c4b2-4baa-a35d-e64e1552dba6:image.png)

# **OverView**

---

![시연 페이퍼_A3사이즈x3.png](attachment:2ea5aca8-9006-4687-9ee3-530d1cbd804b:시연_페이퍼_A3사이즈x3.png)

# **핵심 역량 프로젝트 AhaAha팀 기술서**

---

> **소상공인을 위한 수출 어드바이저.AI**
> 
> 
> 소상공인이 판매하고 싶은 품목을 입력하면,
> 
> AI가 HS 코드 기반으로 유망 수출국을 추천하고,
> 
> 수출 국가에 따른 이커머스 제공,
> 
> 이커머스 선택에 따른 플랫폼 판매글 등록 가이드 및 번역기능 제공, 
> 
> 사용자가 작성한 정보들을 바탕으로
> 
> 자동 상품 리스팅 서비스를 제공하는 플랫폼입니다.
> 

# **프로젝트 산출물**

---

[기획서 Global Go _ 소상공인 AI 수출 어드바이저.hwp](attachment:dd16cd41-e965-42b8-931f-88d3948f2177:기획서_Global_Go___소상공인_AI_수출_어드바이저.hwp)

[Global Go 요구사항정의서_AhaAha 250704.hwp](attachment:dd48fa14-01fe-49c3-94dd-a46c031d7e99:Global_Go_요구사항정의서_AhaAha_250704.hwp)

[Global Go DB 요구사항분석서_AhaAha 250707.hwp](attachment:080c0e03-06f9-4031-a1ce-99f7964ca879:Global_Go_DB_요구사항분석서_AhaAha_250707.hwp)

[Global Go 테이블 명세서_AhaAha 250707.hwp](attachment:03e2e412-7928-4793-a17d-e62a4b8ae800:Global_Go_테이블_명세서_AhaAha_250707.hwp)

[250708_AhaAha화면설계서_최종.pdf](attachment:b3a923b1-5867-446e-a5b3-1c19b2632573:250708_AhaAha화면설계서_최종.pdf)

진행 기간 : 2025.06.26 ~ 2025.07.08

# **시스템 아키텍쳐**

---

![Global Go 시스템 아키텍처_AhaAha.jpg](attachment:46ad5aaa-ff8b-4781-9014-6e0ad24a3bb5:Global_Go_시스템_아키텍처_AhaAha.jpg)

# **목차**

---

1️⃣ 팀원소개

2️⃣ 배포 링크

3️⃣ Github

- Github 링크

4️⃣ WBS

5️⃣ 시연 영상 (Youtube)

6️⃣ 구현 미리보기

- 🏡 **메인 페이지**
- **📝 회원가입 및 로그인**
- **🔍 품목 페이지**
- **🛒 판매 등록 가이드 페이지**
- **📦 상품 리스팅 페이지**
- 🤖 **챗봇 페이지**
- **📦 마이 페이지**

7️⃣ 코드 미리보기

- 🏡 **메인 페이지**
- **📝 회원가입 및 로그인**
- **🔍 품목 기능**
- **🛒 판매 등록 가이드(번역 기능)**
- **📦 상품 리스팅**
- 🤖 **챗봇**
- **📦 마이 페이지**

# **1️⃣ 팀원소개**

---

유준선(팀장)

---

![CszQlgL.jpg](attachment:a2fb71d4-b50e-450d-8187-54b0a6bff061:CszQlgL.jpg)

https://github.com/dbwnstjs4862

최효정

---

![REEWYUw.png](attachment:294d4625-d34e-4076-a235-22535597a489:REEWYUw.png)

https://github.com/hyojung22

유은지

---

![REEWYUw.png](attachment:294d4625-d34e-4076-a235-22535597a489:REEWYUw.png)

https://github.com/ryuenuji

최호철

---

![REEWYUw.png](attachment:294d4625-d34e-4076-a235-22535597a489:REEWYUw.png)

https://github.com/choi-ho-cheol

# **2️⃣ 배포 링크**

---

- Global Go : [http://globalgo.it.com:5173](http://globalgo.it.com:5173/)

# **3️⃣ Github**

---

- Github 링크 : https://github.com/2025-SMHRD-SW-FullStack/Aha_Aha_Proj

# **4️⃣ WBS**

---

![Global_Go_WBS.PNG](attachment:36f23cc9-ac00-4d08-b204-2eccee5d453a:Global_Go_WBS.png)

# **5️⃣ 시연 영상 (Youtube)**

---

https://youtu.be/jIDPu30g56g

# **6️⃣ 구현 미리보기**

---

## 🏡 **메인 페이지**

---

> 사용자가 수출 절차를 시작하는 진입점 역할을 하며, 직관적인 UX를 통해 Global Go의 주요 기능으로 안내합니다.
> 
> 
> ![image.png](attachment:a35f5560-bb69-4dc5-a7cb-1b4810d0f4b3:image.png)
> 

---

## **📝 회원가입 및 로그인 페이지**

---

> 🛡️ **Spring Security와 OAuth2를 활용한 회원가입 및 로그인 기능을 구현하였으며, JWT 기반의 인증 방식을 통해 클라이언트 상태를 관리합니다.**
> 
- 이메일로 회원가입
    
    ![image.png](attachment:e6d8e5d6-825b-4579-9195-00734f9c0852:image.png)
    
    ![image.png](attachment:4031f4d8-e7bf-4583-9ef2-4fdd47d9b4fa:image.png)
    
    ![image.png](attachment:d60ec55b-ccd3-4823-9306-9395153c6627:image.png)
    
- 소셜 회원가입
    
    ![image.png](attachment:c6b3fdcf-4cf8-409b-8cda-67db7b4558af:image.png)
    
    ![image.png](attachment:fab20aa7-10bc-4284-a362-0b515aacd595:image.png)
    
- 로그인
    
    ![image.png](attachment:66d84a8c-5688-4c2c-8002-57a90b7f122c:image.png)
    

---

## **🔍 품목 페이지**

---

> 사용자가 수출하고자 하는 품목을 입력하면, AI가 2025년도 최신 실적 데이터를 기반으로 HS 코드를 추정하고, 수출 유망 국가 TOP 20을 성공 확률과 함께 예측하여 표로 제공합니다.
> 
- 품목페이지
    
    ![image.png](attachment:c924a0a8-5c11-4d4f-943c-c267f6f75628:image.png)
    
    ![image.png](attachment:8b7d6768-20e2-4a1d-a4ad-24e6e214498e:image.png)
    
    ![image.png](attachment:5f72bd9d-3b04-4144-bea2-5e306b916c4a:image.png)
    

---

## **🛒 판매 등록 가이드 페이지**

---

> 사용자가 선택한 이커머스 플랫폼(Amazon 또는 Shopee)에 맞춰, 실제 상품 등록 절차를 이미지와 함께 단계별로 안내해주는 기능입니다.
> 
- 이커머스 플랫폼 가이드 선택
    
    ![image.png](attachment:70703f68-72ce-4c01-b217-bc97153d4478:image.png)
    
- 슬라이드 이미지 및  설명
    
    ![image.png](attachment:a2afb7dc-984b-4213-a082-c7e0a6bcd6ab:image.png)
    
- 입력 폼 번역
    
    ![image.png](attachment:85efe866-0e99-498c-bfb6-e85ca7ceb8d0:image.png)
    
- 상품 페이지 자동 리스팅
    
    ![image.png](attachment:f953697b-cda4-46d0-a083-d5e2ade535c5:image.png)
    

---

## **📦 상품 리스팅 페이지**

---

> 상품 리스팅 페이지는 사용자가 앞서 입력한 판매글 데이터를 바탕으로, Global Go 플랫폼 내 국내/해외 전시관에 자동으로 게시되는 공간입니다.
> 
- 상품 리스팅 페이지
    
    ![image.png](attachment:d89912a8-8a3d-4da1-b3cd-22c51cc5112d:image.png)
    
    ![image.png](attachment:61b13a90-2b16-413b-8c88-c76ec59d51b0:image.png)
    
- 상품 리스팅 상세 페이지
    
    ![image.png](attachment:30be25af-a133-4221-9bde-b459f1821276:image.png)
    
    ![image.png](attachment:3909e5d9-7e2c-4105-811c-782451b78db2:image.png)
    

---

## 🤖 **챗봇 페이지**

---

> **사용자가 처음부터 끝까지 수출 절차를 대화 기반으로 자연스럽게 진행할 수 있도록 설계된 핵심 기능입니다.**
> 
- 품목 입력
    
    ![챗봇_1.PNG](attachment:61b5b484-adad-4297-824c-a1dc37fb4454:챗봇_1.png)
    
- 국가 선택
    
    ![챗봇_2.PNG](attachment:3dad9ed4-15fe-4c2e-a7c9-65ed651cf4b1:챗봇_2.png)
    
- 이커머스 선택
    
    ![챗봇_3.PNG](attachment:012ab04c-bfe4-485b-a6d4-8989dae10a39:챗봇_3.png)
    
- 판매 등록 가이드
    
    ![챗봇_4.PNG](attachment:28dfeaa2-128d-4e6f-ae77-d8abf7c9545f:챗봇_4.png)
    
    ![챗봇_5.PNG](attachment:bb89bb14-5619-44f6-9dd4-c28e221abebe:챗봇_5.png)
    
    ![챗봇_6.PNG](attachment:6e92a8d0-017e-4b9c-8667-67e98785705e:챗봇_6.png)
    
- 번역
    
    ![챗봇_7.PNG](attachment:8c06d91b-f02d-4849-adec-8fad82cfdf4e:챗봇_7.png)
    
- 상품 리스팅
    
    ![챗봇_8.PNG](attachment:e7c4daa5-f497-492b-8517-feffc565ccea:챗봇_8.png)
    

---

## **📦 마이 페이지**

---

> 상품 리스팅 페이지는 사용자가 앞서 입력한 판매글 데이터를 바탕으로, Global Go 플랫폼 내 국내/해외 전시관에 자동으로 게시되는 공간입니다.
> 
- 회원 정보
    
    ![image.png](attachment:4649003b-ae0a-4925-a5d8-d34c766b824d:image.png)
    
    ![image.png](attachment:6c578fd0-a0f8-46e2-9826-ddf871b1b0ad:image.png)
    
- 회사 정보
    
    ![image.png](attachment:d893004c-42c6-43b5-99cd-12ca744d30bb:image.png)
    
    ![image.png](attachment:c6096644-8420-4e13-bcca-aa10aca4e337:image.png)
    
- 즐겨찾기
    
    ![image.png](attachment:13a2fa68-87c8-4622-90dd-62ee2df148a6:image.png)
    
    ![image.png](attachment:3b132bff-cd72-4b5d-ae30-705a6f289444:image.png)
    
- 내 상품 리스트
    
    ![image.png](attachment:b18bb343-47b8-437d-ae6f-f6b0cad51121:image.png)
    

---

# **7️⃣ 코드 미리보기**

---

- **코드 미리보기**
    
    > 🏡 메인 페이지
    > 
    > 
    > Main.jsx
    > 
    > - 코드
    >     
    >     ```jsx
    >     import React, { useEffect } from 'react'
    >     import { useNavigate } from 'react-router-dom'
    >     import MainLayout from '/src/components/layouts/MainLayout'
    >     import  styles from './Main.module.css'
    >     import { Link } from 'react-router-dom'
    >     import itemImg from '/src/assets/images/item.png'
    >     import platformImg from '/src/assets/images/platform.png'
    >     import chatbotImg from '/src/assets/images/chatbot.png'
    >     import boardImg from '/src/assets/images/board.png'
    >     import productImg from '/src/assets/images/product.png'
    >     
    >     const Main = () => {
    >         const navigate = useNavigate();
    >     
    >         useEffect(() => {
    >             const token = localStorage.getItem('accessToken');
    >             // if (!token) {
    >             //     alert("로그인이 필요합니다.");
    >             //     navigate("/login");
    >             // }
    >         }, [navigate]);
    >     
    >         const handleStartChatbot = () => {
    >             navigate("/test-steps");
    >         };
    >     
    >         return (
    >             <MainLayout>
    >                 <div className={styles.wrapper}>
    >                     <div className={styles.left}>
    >                         <div className={`${styles.box} ${styles.item}`}>
    >                             <Link to='/item'>
    >                                 <h2>품목</h2>
    >                                 <p>품목에 맞는 수출 국가와 성공 확률을 <br />추천해드립니다.</p>
    >                                 <img src={itemImg} alt="품목 이미지" />
    >                             </Link>
    >                         </div>
    >                         <div className={`${styles.box} ${styles.platform}`}>
    >                             <Link to='/platform'>
    >                                 <h2>중개플랫폼</h2>
    >                                 <p>상품 판매 등록 방법을 단계별로<br /> 쉽게 안내해 드립니다.</p>
    >                                 <img src={platformImg} alt="플랫폼 이미지" />
    >                             </Link>
    >                         </div>
    >                     </div>
    >                     
    >                     {/* <div className={`${styles.box} ${styles.document}`}>
    >                         <Link to='/documents'>
    >                             <h2>내 문서함</h2>
    >                             <p>수출 시 필요한 서류들 모음함입니다.</p>
    >                             <img src={documentImg} alt="품목 이미지" />
    >                         </Link>
    >                     </div> */}
    >     
    >                     <div className={styles.right}>
    >                         <div className={`${styles.box} ${styles.board}`}>
    >                             <Link to='/exhibition'>
    >                                 <h2>상품</h2>
    >                                 <p>Amazon과 Shoppe에 등록한 <br />판매 제품들을 보여줍니다.</p>
    >                                 <img src={productImg} alt="게시판 이미지" />
    >                             </Link>
    >                         </div>
    >     
    >                         <div className={`${styles.box} ${styles.chatbot}`}>
    >                             <Link to='/chatbot'>
    >                                 <h2>챗봇 가이드</h2>
    >                                 <p>품목 검색부터 수출 유망 국가 추천, <br />판매 등록 가이드, 게시글 작성<br />까지 한 번에!</p>
    >                                 <img src={chatbotImg} alt="챗봇 이미지" />
    >                             </Link>
    >                         </div>
    >                     </div>
    >     
    >                 </div>
    >             </MainLayout>
    >         )
    >     }
    >     
    >     export default Main
    >     
    >     ```
    >     
    
    ---
    
    > **📝 회원가입 및 로그인**
    > 
    > 
    > AuthController.java
    > 
    > - 코드
    >     
    >     ```java
    >     package com.globalgo.globalgo.auth;
    >     
    >     import com.globalgo.globalgo.user.User;
    >     import com.globalgo.globalgo.user.UserService;
    >     import com.globalgo.globalgo.user.dto.LoginRequest;
    >     import com.globalgo.globalgo.user.dto.LoginResponse;
    >     import com.globalgo.globalgo.user.dto.SignupRequest;
    >     import com.globalgo.globalgo.user.dto.UserResponse;
    >     import io.swagger.v3.oas.annotations.Operation;
    >     import io.swagger.v3.oas.annotations.Parameter;
    >     import io.swagger.v3.oas.annotations.responses.ApiResponse;
    >     import io.swagger.v3.oas.annotations.tags.Tag;
    >     import jakarta.servlet.http.Cookie;
    >     import jakarta.servlet.http.HttpServletRequest;
    >     import jakarta.servlet.http.HttpServletResponse;
    >     import lombok.RequiredArgsConstructor;
    >     import org.springframework.http.ResponseEntity;
    >     import org.springframework.security.authentication.AuthenticationManager;
    >     import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    >     import org.springframework.security.core.Authentication;
    >     import org.springframework.security.core.context.SecurityContextHolder;
    >     import org.springframework.web.bind.annotation.PostMapping;
    >     import org.springframework.web.bind.annotation.RequestBody;
    >     import org.springframework.web.bind.annotation.RequestMapping;
    >     import org.springframework.web.bind.annotation.RestController;
    >     
    >     import java.time.LocalDateTime;
    >     
    >     @RestController
    >     @RequestMapping("/api/auth")
    >     @RequiredArgsConstructor
    >     @Tag(name = "인증 API", description = "회원가입, 로그인, 토큰 발급")
    >     public class AuthController {
    >     
    >         private final UserService userService;
    >         private final JwtTokenProvider jwtTokenProvider;
    >         private final AuthenticationManager authenticationManager;
    >         private final RefreshTokenRepository refreshTokenRepository;
    >     
    >         /**
    >          * 이메일 인증이 완료된 사용자만 가입 가능
    >          */
    >         @PostMapping("/signup")
    >         @Operation(summary = "회원가입", description = "이메일 인증이 완료된 사용자만 회원가입이 가능합니다.")
    >         @ApiResponse(responseCode = "200", description = "회원가입 성공")
    >         @ApiResponse(responseCode = "403", description = "이메일 인증이 완료되지 않은 경우")
    >         public ResponseEntity<UserResponse> signup(@RequestBody SignupRequest request) {
    >             if (!userService.isEmailVerified(request.getEmail())) {
    >                 return ResponseEntity.status(403).build(); // 이메일 인증 미완료
    >             }
    >     
    >             User user = userService.registerUser(request);
    >             return ResponseEntity.ok(new UserResponse(user));
    >         }
    >     
    >         /**
    >          * 일반 로그인 → Access Token + Refresh Token 발급
    >          * AccessToken: 응답 본문
    >          * RefreshToken: HTTP-only 쿠키 저장
    >          */
    >         @PostMapping("/login")
    >         @Operation(summary = "로그인", description = "이메일/비밀번호 기반 로그인 후 JWT 토큰을 발급합니다.")
    >         @ApiResponse(responseCode = "200", description = "로그인 성공 - JWT 토큰 반환")
    >         public ResponseEntity<LoginResponse> login(
    >                 @RequestBody @Parameter(description = "이메일/비밀번호 정보") LoginRequest request,
    >                 HttpServletResponse response
    >         ) {
    >             // 사용자 인증 처리
    >             Authentication authentication = authenticationManager.authenticate(
    >                     new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
    >             );
    >             SecurityContextHolder.getContext().setAuthentication(authentication);
    >     
    >             // 유저 조회
    >             User user = userService.findByEmail(request.getEmail())
    >                     .orElseThrow(() -> new IllegalArgumentException("유저 정보를 찾을 수 없습니다."));
    >     
    >             // 토큰 생성
    >             String accessToken = jwtTokenProvider.createAccessToken(user.getId());
    >             String refreshToken = jwtTokenProvider.createRefreshToken(user.getId());
    >     
    >             // RefreshToken 저장 (DB)
    >             refreshTokenRepository.save(new RefreshToken(user.getId(), refreshToken, LocalDateTime.now().plusDays(14))); // 토큰 만료기간 14일 유효
    >     
    >             // RefreshToken → HTTP-only 쿠키 설정
    >             Cookie cookie = new Cookie("refreshToken", refreshToken);
    >             cookie.setHttpOnly(true);
    >             cookie.setPath("/");
    >             cookie.setMaxAge(60 * 60 * 24 * 14); // 14일
    >             response.addCookie(cookie);
    >     
    >             // 응답 반환 (accessToken + 유저 정보)
    >             return ResponseEntity.ok(new LoginResponse(accessToken, new UserResponse(user)));
    >         }
    >     
    >         @PostMapping("/logout")
    >         @Operation(summary = "로그아웃", description = "RefreshToken 삭제 및 쿠키 제거")
    >         public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
    >             // 1. 쿠키에서 refreshToken 추출
    >             Cookie[] cookies = request.getCookies();
    >             if (cookies != null) {
    >                 for (Cookie cookie : cookies) {
    >                     if ("refreshToken".equals(cookie.getName())) {
    >                         String refreshToken = cookie.getValue();
    >     
    >                         // 2. 이메일 추출 후 DB에서 삭제
    >                         if (jwtTokenProvider.validateToken(refreshToken)) {
    >                             Long userId = jwtTokenProvider.getUserId(refreshToken);
    >                             refreshTokenRepository.deleteById(userId);
    >                         }
    >     
    >                         // 3. 쿠키 삭제
    >                         Cookie deleteCookie = new Cookie("refreshToken", null);
    >                         deleteCookie.setMaxAge(0);
    >                         deleteCookie.setPath("/");
    >                         response.addCookie(deleteCookie);
    >                     }
    >                 }
    >             }
    >     
    >             return ResponseEntity.ok("로그아웃 완료");
    >         }
    >     
    >     }
    >     
    >     ```
    >     
    
    ---
    
    > **🔍 품목 기능**
    > 
    > 
    > recommend_core.py
    > 
    > - 코드
    >     
    >     ```python
    >     import random
    >     from app.core.state import app_state
    >     from app.services.cache import get_search_result_from_db, save_search_result_to_db
    >     from app.utils.vector_db import find_relevant_hs_codes_from_vector_db
    >     from app.services.analysis import calculate_recommendation_score, generate_report_with_llm
    >     
    >     def recommend_core(item: str, page: int = 1, size: int = 10) -> dict:
    >         # 1. 캐시 먼저 조회
    >         cached_result = get_search_result_from_db(item)
    >         if cached_result:
    >             print(f"'{item}'는 캐시에서 반환!")
    >             return cached_result
    >     
    >         # 2. 메모리/벡터DB 등에서 데이터 준비
    >         df_export = app_state.get("df_export")
    >         hscode_collection = app_state.get("hscode_collection")
    >         if df_export is None or hscode_collection is None:
    >             return {"error": "서버 데이터 준비 중"}
    >     
    >         # 3. 품목명으로 유사 HS코드 검색
    >         relevant_codes = find_relevant_hs_codes_from_vector_db(item, hscode_collection)
    >         if not relevant_codes:
    >             return {"error": f"'{item}'에 대한 품목 정보를 찾을 수 없습니다."}
    >     
    >         # 4. HS코드에 맞는 수출실적 데이터 추출
    >         filtered_export_data = df_export[df_export['HS코드'].isin(relevant_codes)]
    >         if filtered_export_data.empty:
    >             return {"error": f"검색된 HS코드({', '.join(relevant_codes)})에 대한 수출 실적 데이터가 없습니다."}
    >     
    >         # 5. 국가별 점수 계산
    >         ranked_countries_df = calculate_recommendation_score(filtered_export_data)
    >         if ranked_countries_df.empty:
    >             return {"error": "점수 계산 중 오류"}
    >     
    >         # 6. AI(LLM)로 국가별 추천 이유 분석
    >         top_20_countries_df = ranked_countries_df.head(20)
    >         llm_analysis_result = generate_report_with_llm(item, top_20_countries_df)
    >         country_key_factors = {d["country_name"]: d["key_factor"] for d in llm_analysis_result.get("country_analysis", [])}
    >         ranked_countries_df['key_factor'] = ranked_countries_df['국가'].map(country_key_factors)
    >         ranked_countries_df['key_factor'] = ranked_countries_df['key_factor'].fillna("분석 정보 없음")
    >     
    >         # 7. 점수 낮은 국가 경고문구 랜덤 삽입
    >         low_score_mask = ranked_countries_df['종합점수'] < 35
    >         if low_score_mask.any():
    >             warning_phrases = [
    >                 "주의: 신중한 접근이 필요한 시장",
    >                 "경고: 시장 진입 리스크 높음",
    >                 "위험: 수익성 확보에 어려움 예상"
    >             ]
    >             num_low_scores = low_score_mask.sum()
    >             random_warnings = random.choices(warning_phrases, k=num_low_scores)
    >             ranked_countries_df.loc[low_score_mask, 'key_factor'] = random_warnings
    >     
    >         # 8. 점수 표기 변환 (20~90%로 조정)
    >         original_score = ranked_countries_df['종합점수']
    >         new_score = 20 + (original_score * 0.7)
    >         ranked_countries_df['recommendationScore'] = (round(new_score, 1)).astype(str) + '%'
    >     
    >         display_columns = ['국가', 'key_factor', 'recommendationScore']
    >         display_df = ranked_countries_df[display_columns].rename(columns={'국가': 'country'})
    >         display_df = display_df.reset_index(drop=True)
    >         display_df['rank'] = display_df.index + 1
    >         display_df = display_df[['rank', 'country', 'key_factor', 'recommendationScore']]
    >         
    >         total_items = len(display_df)
    >         start_index = (page - 1) * size
    >         end_index = start_index + size
    >     
    >         paginated_data = display_df.iloc[start_index:end_index]
    >         table_data = paginated_data.to_dict(orient='records')
    >         top_country_data = display_df.head(1).to_dict(orient='records')[0] if total_items > 0 else None
    >     
    >         response_data = {
    >             "pagination": {"page": page, "size": size, "total_items": total_items},
    >             "topCountryData": top_country_data,
    >             "tableData": table_data
    >         }
    >     
    >        # 9. 결과 캐시(DB)에 저장
    >         print(f"[DEBUG] 캐시 저장 함수 호출 직전: item={item}")
    >         save_search_result_to_db(item, response_data)
    >         print(f"[DEBUG] 캐시 저장 함수 호출 완료: item={item}")
    >         return response_data
    >     ```
    >     
    
    ---
    
    > **🛒 판매 등록 가이드 (번역 기능)**
    > 
    > 
    > translate_core.py
    > 
    > - 코드
    >     
    >     ```python
    >     import openai
    >     import os
    >     
    >     client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    >     
    >     def gpt_translate_fields_dict(field_dict: dict) -> dict:
    >         # 1) 번역 대상(빈 문자열 제외)만 뽑아서 순서 보존
    >         to_translate = {
    >             k: v for k, v in field_dict.items()
    >             if isinstance(v, str) and v.strip()
    >         }
    >         if not to_translate:
    >             return {}  # 번역할 게 없으면 빈 dict
    >     
    >         # 2) 번역할 값만 프롬프트에 한 줄씩
    >         prompt = (
    >             "Translate the following to English. "
    >             "If already English, leave it unchanged. "
    >             "Return one translation per line, in the same order:\n---\n"
    >             + "\n".join(to_translate.values())
    >         )
    >     
    >         response = client.chat.completions.create(
    >             model="gpt-4.1",
    >             messages=[
    >                 {"role": "system", "content": "You are a professional translator."},
    >                 {"role": "user",   "content": prompt}
    >             ],
    >             max_tokens=512,
    >             temperature=0.2,
    >         )
    >     
    >         # 3) 응답 라인 분리
    >         lines = [line.strip()
    >             for line in response.choices[0].message.content.splitlines() 
    >             if line.strip()]
    >     
    >         # 4) 번역된 값만 키 순서에 맞춰 매핑
    >         translated = dict(zip(to_translate.keys(), lines))
    >     
    >         # 5) 원본 field_dict 전체와 병합
    >         return { **field_dict, **translated }
    >     ```
    >     
    
    ---
    
    > **📦 상품 리스팅**
    > 
    > 
    > DomesticPostController.java
    > 
    > ForeignPostController.java
    > 
    > - 국내
    >     
    >     ```java
    >     package com.globalgo.globalgo.post.domestic;
    >     
    >     import com.globalgo.globalgo.post.domestic.dto.DomesticPostRequest;
    >     import com.globalgo.globalgo.post.domestic.dto.DomesticPostResponse;
    >     import io.swagger.v3.oas.annotations.Operation;
    >     import io.swagger.v3.oas.annotations.Parameter;
    >     import io.swagger.v3.oas.annotations.media.Content;
    >     import io.swagger.v3.oas.annotations.media.Schema;
    >     import io.swagger.v3.oas.annotations.responses.ApiResponse;
    >     import io.swagger.v3.oas.annotations.responses.ApiResponses;
    >     import io.swagger.v3.oas.annotations.tags.Tag;
    >     import lombok.RequiredArgsConstructor;
    >     import org.springframework.data.domain.Sort;
    >     import org.springframework.http.ResponseEntity;
    >     import org.springframework.web.bind.annotation.*;
    >     
    >     import java.util.List;
    >     
    >     @RestController
    >     @RequiredArgsConstructor
    >     @RequestMapping("/api/domestic-post")
    >     @Tag(name = "상품 국내용 API", description = "국내 게시판 관련 API")
    >     public class DomesticPostController {
    >     
    >         private final DomesticPostService domesticPostService;
    >         private final DomesticPostRepository domesticPostRepository;
    >     
    >         @Operation(summary = "국내 게시글 등록", description = "사용자가 국내용 게시글을 등록합니다.")
    >         @ApiResponses({
    >                 @ApiResponse(responseCode = "200", description = "게시 성공"),
    >                 @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
    >                 @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    >         })
    >         @PostMapping
    >         public ResponseEntity<String> createDomesticPost(
    >                 @RequestBody
    >                 @io.swagger.v3.oas.annotations.parameters.RequestBody(
    >                         description = "등록할 게시글 정보",
    >                         required = true,
    >                         content = @Content(schema = @Schema(implementation = DomesticPostRequest.class))
    >                 )
    >                 DomesticPostRequest request) {
    >             domesticPostService.create(
    >                     request.getUserId(),
    >                     request.getTitle(),
    >                     request.getContent(),
    >                     request.getImg(),
    >                     request.getUrl(),
    >                     request.getPlatform(),
    >                     request.getYourPrice()
    >             );
    >             return ResponseEntity.ok("게시 완료");
    >         }
    >     
    >         @Operation(summary = "전체 국내 게시글 조회", description = "모든 국내 게시글을 최신순으로 조회합니다.")
    >         @GetMapping
    >         public ResponseEntity<List<DomesticPostResponse>> getAllPosts() {
    >             List<DomesticPost> posts = domesticPostRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    >             List<DomesticPostResponse> response = posts.stream()
    >                     .map(DomesticPostResponse::from)
    >                     .toList();
    >             return ResponseEntity.ok(response);
    >         }
    >     
    >         @Operation(summary = "게시글 상세 조회", description = "게시글 ID로 국내 게시글 상세 정보를 조회합니다.")
    >         @GetMapping("/{postId}")
    >         public ResponseEntity<DomesticPostResponse> getPostById(
    >                 @Parameter(description = "게시글 ID", example = "1")
    >                 @PathVariable Long postId) {
    >             DomesticPost post = domesticPostRepository.findById(postId).orElseThrow();
    >             return ResponseEntity.ok(DomesticPostResponse.from(post));
    >         }
    >     
    >         @Operation(summary = "내 게시글 목록 조회", description = "userId로 본인의 국내 게시글만 조회합니다.")
    >         @GetMapping("/my")
    >         public ResponseEntity<List<DomesticPostResponse>> getMyPosts(
    >                 @Parameter(description = "사용자 ID", example = "1")
    >                 @RequestParam Long userId) {
    >             List<DomesticPost> posts = domesticPostRepository.findByUserId(userId);
    >             List<DomesticPostResponse> response = posts.stream()
    >                     .map(DomesticPostResponse::from)
    >                     .toList();
    >             return ResponseEntity.ok(response);
    >         }
    >     }
    >     
    >     ```
    >     
    > - 해외
    >     
    >     ```java
    >     package com.globalgo.globalgo.post.foreign;
    >     
    >     import com.globalgo.globalgo.post.foreign.dto.ForeignPostRequest;
    >     import com.globalgo.globalgo.post.foreign.dto.ForeignPostResponse;
    >     import io.swagger.v3.oas.annotations.Operation;
    >     import io.swagger.v3.oas.annotations.Parameter;
    >     import io.swagger.v3.oas.annotations.media.Content;
    >     import io.swagger.v3.oas.annotations.media.Schema;
    >     import io.swagger.v3.oas.annotations.parameters.RequestBody;
    >     import io.swagger.v3.oas.annotations.responses.ApiResponse;
    >     import io.swagger.v3.oas.annotations.responses.ApiResponses;
    >     import io.swagger.v3.oas.annotations.tags.Tag;
    >     import lombok.RequiredArgsConstructor;
    >     import org.springframework.data.domain.Sort;
    >     import org.springframework.http.ResponseEntity;
    >     import org.springframework.web.bind.annotation.*;
    >     
    >     import java.util.List;
    >     
    >     @RestController
    >     @RequiredArgsConstructor
    >     @RequestMapping("/api/foreign-post")
    >     @Tag(name = "상품 해외용 API", description = "해외 게시판 관련 API")
    >     public class ForeignPostController {
    >     
    >         private final ForeignPostService foreignPostService;
    >         private final ForeignPostRepository foreignPostRepository;
    >     
    >         @Operation(summary = "해외 게시글 등록", description = "사용자가 해외용 게시글을 등록합니다.")
    >         @ApiResponses({
    >                 @ApiResponse(responseCode = "200", description = "게시 성공"),
    >                 @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
    >                 @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    >         })
    >         @PostMapping
    >         public ResponseEntity<String> createForeignPost(
    >                 @RequestBody(
    >                         description = "등록할 해외 게시글 정보",
    >                         required = true,
    >                         content = @Content(schema = @Schema(implementation = ForeignPostRequest.class))
    >                 )
    >                 @org.springframework.web.bind.annotation.RequestBody ForeignPostRequest request) {
    >             foreignPostService.create(
    >                     request.getUserId(),
    >                     request.getTitle(),
    >                     request.getContent(),
    >                     request.getImg(),
    >                     request.getUrl(),
    >                     request.getPlatform(),
    >                     request.getYourPrice()
    >             );
    >             return ResponseEntity.ok("게시 완료");
    >         }
    >     
    >         @Operation(summary = "전체 해외 게시글 조회", description = "모든 해외 게시글을 최신순으로 조회합니다.")
    >         @GetMapping
    >         public ResponseEntity<List<ForeignPostResponse>> getAllPosts() {
    >             List<ForeignPost> posts = foreignPostRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    >             List<ForeignPostResponse> response = posts.stream()
    >                     .map(ForeignPostResponse::from)
    >                     .toList();
    >             return ResponseEntity.ok(response);
    >         }
    >     
    >         @Operation(summary = "해외 게시글 상세 조회", description = "postId로 해외 게시글 상세 정보를 조회합니다.")
    >         @ApiResponses({
    >                 @ApiResponse(responseCode = "200", description = "조회 성공"),
    >                 @ApiResponse(responseCode = "404", description = "게시글 없음", content = @Content)
    >         })
    >         @GetMapping("/{postId}")
    >         public ResponseEntity<ForeignPostResponse> getPostById(
    >                 @Parameter(description = "게시글 ID", example = "1")
    >                 @PathVariable Long postId) {
    >             ForeignPost post = foreignPostRepository.findById(postId).orElseThrow();
    >             return ResponseEntity.ok(ForeignPostResponse.from(post));
    >         }
    >     
    >         @Operation(summary = "내 해외 게시글 조회", description = "userId로 본인의 해외 게시글만 조회합니다.")
    >         @GetMapping("/my")
    >         public ResponseEntity<List<ForeignPostResponse>> getMyPosts(
    >                 @Parameter(description = "사용자 ID", example = "1")
    >                 @RequestParam Long userId) {
    >             List<ForeignPost> posts = foreignPostRepository.findByUserId(userId);
    >             List<ForeignPostResponse> response = posts.stream()
    >                     .map(ForeignPostResponse::from)
    >                     .toList();
    >             return ResponseEntity.ok(response);
    >         }
    >     }
    >     
    >     ```
    >     
    
    ---
    
    > 🤖 **챗봇**
    > 
    > 
    > chatbot_service.py
    > 
    > ChatbotPostController.java
    > 
    > - 챗봇
    >     
    >     ```python
    >     from app.core.gpt_client import call_chatgpt
    >     from app.services.chatbot_state import (
    >         get_user_context,
    >         update_user_context,
    >         add_chat_to_redis,
    >         get_chat_history,
    >     )
    >     from app.repositories.chatbot_repository import save_chat_message
    >     from app.models.chatbot_message import RoleEnum, ChatbotMessage
    >     from sqlalchemy.orm import Session
    >     from app.utils.slide_loader import get_slide_message_gpt, is_last_slide
    >     from app.utils.post_api import post_to_spring_board
    >     from app.utils.recommend import get_top_country_details
    >     from app.constants.shopee_countries import SHOPEE_COUNTRIES
    >     import asyncio
    >     from app.utils.slide_utils import split_slide_message
    >     
    >     # ➕ NEW: JSON 파싱용
    >     import json
    >     import re
    >     
    >     MAX_HISTORY = 10
    >     
    >     SYSTEM_PROMPT = """
    >     너는 사용자의 수출을 도와주는 친절하고 유능한 AI 챗봇이야. GlobalGo 플랫폼에서 활동하며, 다음과 같은 흐름으로 사용자를 도와야 해:
    >     
    >     🧭 전체 단계 흐름:
    >     1. 품목 입력 → 수출 유망 국가 추천 (TOP 20, 표 형식으로 제공)
    >     2. 국가 선택 → 해당 국가에서 활용할 수 있는 이커머스 플랫폼 추천 (Amazon, Shopee 2개만 추천)
    >     3. 플랫폼 선택 → 해당 플랫폼의 수출 가이드를 슬라이드 형식(이미지 + 설명)으로 하나씩 설명
    >     4. 판매글 입력 (제목 + 내용) → 영어 번역 제공
    >     5. 게시판 등록 여부 확인 (국내 / 해외 / 둘 다) → 자동 등록 처리
    >     6. 마무리 안내 ("게시 완료! 수고 많으셨어요 😊")
    >     
    >     📊 [중요] 국가 추천 시 표 형식 출력:
    >     가능하면 마크다운 표 형식으로 정리해서 보여줘. 예시는 다음과 같아:
    >     
    >     | 순위 | 국가 | 성공 확률 (%) | 추천 이유 |
    >     |------|------|----------------|------------|
    >     | 1 | 미국 | 83.2% | 시장이 크고 친환경 제품 선호도가 높아요 |
    >     | 2 | 일본 | 76.5% | K-뷰티와 관련 제품에 대한 수요가 높아요 |
    >     | 3 | 중국 | 70.4% | 대규모 소비 시장이 형성되어 있어요 |
    >     
    >     ※ 표가 너무 길면 상위 3~5개만 먼저 보여주고, "더 보기" 요청 시 나머지를 이어서 설명해도 좋아.
    >     
    >     🖼️ [중요] 슬라이드 이미지 경로 규칙 (Amazon, Shopee):
    >     - 슬라이드 설명 시에는 반드시 이미지 경로를 함께 제공해야 해.
    >     - 이미지 경로는 다음 중 하나여야 하며, 새로운 경로나 외부 링크를 생성하면 안 돼.
    >     
    >       📦 Amazon 수출 가이드:
    >       http://localhost:8000/static/slides/amazon/slide_1.png
    >       http://localhost:8000/static/slides/amazon/slide_2.png 
    >       http://localhost:8000/static/slides/amazon/slide_3.png 
    >       http://localhost:8000/static/slides/amazon/slide_4.png 
    >       http://localhost:8000/static/slides/amazon/slide_5.png 
    >     
    >       🛒 Shopee 수출 가이드:
    >       http://localhost:8000/static/slides/shopee/slide_1.png 
    >       http://localhost:8000/static/slides/shopee/slide_2.png 
    >       http://localhost:8000/static/slides/shopee/slide_3.png 
    >       http://localhost:8000/static/slides/shopee/slide_4.png 
    >       http://localhost:8000/static/slides/shopee/slide_5.png 
    >     
    >     ❗ 절대 다른 URL을 만들거나 외부 이미지를 넣지 마. 정해진 경로만 사용해!
    >     
    >     🧠 문맥 유도 기능:
    >     - 사용자가 순서를 정확히 따르지 않아도 문맥을 자연스럽게 이어가야 해.
    >     - "아마존", "쇼피" 같은 단어만 말해도 플랫폼 선택으로 이해하고 진행해.
    >     - "전시관", "1", "2", "다음" 같은 짧은 말도 맥락에 따라 해석해서 대응해.
    >     - "세금 얼마나 붙어?", "비용 많아?" 같은 질문이 들어오면 먼저 친절하게 답한 후 원래 흐름으로 자연스럽게 유도해줘.
    >     - 사용자의 감정, 불안, 칭찬, 농담 등도 자연스럽게 반응하고 존중해줘.
    >     
    >     💬 말투 스타일:
    >     - 말투는 따뜻하고 친근하게, 부드럽고 명확한 어조로 설명해줘.
    >     - 과한 이모지는 피하되, 흐름을 돕는 이모지(😊, 💬, 📦, ✅ 등)는 적절히 활용해줘.
    >     - 초보자도 이해할 수 있도록 용어는 쉽게 설명해주고, 필요한 경우 예시도 들어줘.
    >     
    >     예를 들어:
    >     - "비누 수출하려고 하는데 어디가 좋아?" → TOP 국가 추천 표 제공
    >     - "미국" → 해당 국가 플랫폼 추천
    >     - "아마존" → 슬라이드 가이드 시작
    >     - "다음" → 다음 슬라이드 보여줘
    >     - "전시관에 올려줘" → 해외 게시판 자동 등록
    >     - "질문 있어요" → 질문에 친절히 답한 후 흐름 복귀
    >     
    >     언제나 사용자가 부담 없이 이야기할 수 있도록 진심을 담은 AI 친구처럼 대응해줘.
    >     """
    >     
    >     SLIDE_PROMPT = """
    >     다음 슬라이드 내용을 초보자도 이해할 수 있게 자연스럽고 친절하게 설명해줘.
    >     슬라이드에 집중하되, 사용자가 다음 단계로 넘어가고 싶다고 말하면 "슬라이드를 종료하고 다음 단계로 진행할 수 있어요" 라고 안내해줘.
    >     """
    >     
    >     TRANSLATE_PROMPT = """
    >     You are a professional translator.
    >     Translate the following product posting into natural U.S. English and return ONLY valid JSON in the form:
    >     {{ "en_title": "...", "en_content": "..." }}
    >     
    >     다음 한국어 제목과 내용을 자연스러운 미국식 영어로 번역해 줘.
    >     **정확히** 위 JSON 형식만 반환하고 다른 문구는 절대 쓰지 마.
    >     
    >     제목: "{title}"
    >     내용: "{content}"
    >     
    >     반드시 위 JSON 한 줄로만 답하고, 추가 텍스트, 코드블럭, 예시, 주석, 설명, 안내 등은 절대 붙이지 마라.
    >     """
    >     
    >     def parse_gpt_response_to_json(raw):
    >         # 1. json 문자열이면
    >         try:
    >             data = json.loads(raw)
    >             # 케이스1. en_title/en_content가 있음
    >             if 'en_title' in data and 'en_content' in data:
    >                 return {
    >                     "en_title": data["en_title"].strip(),
    >                     "en_content": data["en_content"].strip()
    >                 }
    >             # 케이스2. Title/Description (json으로 온 경우)
    >             if 'Title' in data and 'Description' in data:
    >                 return {
    >                     "en_title": data["Title"].strip(),
    >                     "en_content": data["Description"].strip()
    >                 }
    >         except Exception:
    >             pass
    >     
    >         # 2. 마크다운/텍스트 라벨에서 추출 (다국어 라벨 대응)
    >         title_match = re.search(r'(?:\*\*|__)?(?:en_title|title|제목)[\s\(\)A-Za-z가-힣]*[:：]\s*(.+)', raw, re.I)
    >         content_match = re.search(r'(?:\*\*|__)?(?:en_content|content|내용|description)[\s\(\)A-Za-z가-힣]*[:：]\s*([\s\S]+?)(?:\n[-*#]{3,}|\n$|$)', raw, re.I)
    >     
    >         title = title_match.group(1).strip() if title_match else None
    >         content = content_match.group(1).strip() if content_match else None
    >     
    >         # 3. 둘 중 하나라도 있으면 무조건 반환
    >         if title or content:
    >             return {
    >                 "en_title": title or "[No Title]",
    >                 "en_content": content or "[No Content]"
    >             }
    >     
    >         # 4. 진짜 못 찾으면 그냥 통째로 내용에 넣기
    >         return {
    >             "en_title": "[Raw English]",
    >             "en_content": raw.strip()
    >         }
    >     
    >     def translate_post(user_id: int, title_kr: str, content_kr: str):
    >         print("=== translate_post진입 ===")
    >         print("title_kr:", repr(title_kr))
    >         print("content_kr:", repr(content_kr))
    >         try:
    >             prompt = TRANSLATE_PROMPT.format(title=title_kr, content=content_kr)
    >         except Exception as e:
    >             print("TRANSLATE_PROMPT format 에러:", e)
    >             raise
    >         print("=== translate_post진입1 ===")
    >         raw = call_chatgpt(user_id=user_id, system_prompt="", user_prompt=prompt, chat_history=[])
    >         print("=== GPT RAW RESPONSE ===")
    >         print(raw)
    >         print("========================")
    >         result = parse_gpt_response_to_json(raw)
    >         title = result.get("en_title") or ""
    >         content = result.get("en_content") or ""
    >         if not title or not content:
    >             print("❌ 번역 KeyError 발생, result:", result)
    >         return title, content
    >     
    >     def extract_title_content(gpt_resp: str):
    >         print("extract_title_content 진입")
    >         import re
    >         try:
    >             # 정규식 패턴 (혼종 포함)
    >             title_pattern = r"(?:\*\*|__)?\s*(제목|title)[\s\(\)A-Za-z가-힣]*[:：]\s*(.+)"
    >             content_pattern = r"(?:\*\*|__)?\s*(내용|content)[\s\(\)A-Za-z가-힣]*[:：]\s*([\s\S]+?)(?:\n[-*#]{3,}|\n$|$)"
    >     
    >             title_match = re.search(title_pattern, gpt_resp, re.I)
    >             content_match = re.search(content_pattern, gpt_resp, re.I)
    >             print("title_match:", title_match)
    >             print("content_match:", content_match)
    >     
    >             title_kr = title_match.group(2).strip() if title_match else ""
    >             content_kr = content_match.group(2).strip() if content_match else ""
    >             return title_kr, content_kr
    >         except Exception as e:
    >             print("extract_title_content 예외 발생:", e)
    >             print("gpt_resp 값:", repr(gpt_resp))
    >             # 에러가 나면 raw 텍스트 통째로 반환
    >             return "", ""
    >     
    >     def extract_title_content_with_gpt(user_id: int, user_input: str) -> tuple:
    >         """
    >         GPT에게 '아래 텍스트에서 제목/내용을 최대한 자연스럽게 분리해줘.
    >         제목이 없으면 첫 문장을 제목으로, 나머지는 내용으로. 내용만 있으면 제목은 공백'
    >         """
    >         PROMPT = """
    >     아래 입력에서 제목과 내용을 분리해 반드시 아래 한글 라벨로만 반환해줘.
    >     
    >     제목: ...
    >     내용: ...
    >     
    >     - 라벨에 영어, 영문병기, 설명, 코드블럭, 마크다운 등 절대 넣지 마라.
    >     - 라벨은 무조건 '제목:' '내용:'만 써라.
    >     - 부가설명, 안내, 예시, 영문 라벨, (Title), (Content), 코드블럭, 별도 마크다운, --- 등도 절대 넣지 마라.
    >     - 반환 예시 (형식 지켜라):
    >     제목: 수제 비누 3종 세트
    >     내용: 민감성 피부에도 쓸 수 있는 천연 비누입니다.
    >     
    >     입력: {user_input}
    >     """    
    >         
    >         prompt = PROMPT.format(user_input=user_input)
    >         print("extract_title_content_with_gpt 진입")
    >         gpt_resp = call_chatgpt(user_id=user_id, system_prompt="", user_prompt=prompt, chat_history=[])
    >         print("gpt_resp repr:", repr(gpt_resp))
    >     
    >         print("extract_title_content 호출 직전")
    >         title_kr, content_kr = extract_title_content(gpt_resp)
    >         print("extract_title_content 호출 완료") 
    >         print("title_kr:", title_kr)
    >         print("content_kr:", content_kr)
    >     
    >         return title_kr, content_kr
    >     
    >     class ChatbotService:
    >         print("✅ ChatbotService 클래스 로딩됨")
    >         def handle(self, db: Session, user_id: str, message: str) -> dict:
    >             save_chat_message(db, user_id, RoleEnum.user, message)
    >             add_chat_to_redis(user_id, "user", message)
    >     
    >             chat_history = get_chat_history(user_id)[:MAX_HISTORY]
    >             formatted_history = self.convert_to_gpt_format(chat_history)
    >     
    >             ctx_result = self.update_context_from_message(db, user_id, message)
    >             if isinstance(ctx_result, dict) and "response" in ctx_result:
    >                 return ctx_result
    >             
    >             context = get_user_context(user_id)
    >     
    >             # Step6 완료
    >             if context.get("stage") == "step6":
    >                 return self._handle_final_step(db, user_id)
    >     
    >             # Step5 게시 요청
    >             if context.get("stage") == "step5":
    >                 print("🛠 Step5 진입 확인됨")
    >                 return self._handle_post_request(db, user_id, message, context)
    >     
    >             # Step3 슬라이드 설명
    >             if context.get("stage") == "step3" and context.get("platform"):
    >                 return self._handle_slide_step(db, user_id, context)
    >     
    >             # GPT 호출 처리
    >             if context.get("stage") == "step3":
    >                 system_prompt = SYSTEM_PROMPT + "\n\n" + SLIDE_PROMPT
    >             else:
    >                 system_prompt = SYSTEM_PROMPT
    >     
    >             gpt_response = call_chatgpt(
    >                 user_id=user_id,
    >                 system_prompt=system_prompt,
    >                 user_prompt=message,
    >                 chat_history=formatted_history
    >             )
    >     
    >             split_messages = split_slide_message(str(gpt_response))
    >             if not isinstance(split_messages, list):
    >                 split_messages = [{"role": "assistant", "type": "text", "content": "죄송합니다. 오류가 발생했어요."}]
    >     
    >             for m in split_messages:
    >                 if m["type"] == "text":
    >                     save_chat_message(db, user_id, RoleEnum.assistant, m["content"])
    >                     add_chat_to_redis(user_id, "assistant", m["content"])
    >                     break
    >     
    >             return {
    >                 "messages": split_messages,
    >                 "context": get_user_context(user_id),
    >                 "step": get_user_context(user_id).get("stage") or "start"
    >             }
    >     
    >         def _handle_final_step(self, db, user_id):
    >             msg = "게시가 완료되었습니다! 수고 많으셨어요 😊"
    >             save_chat_message(db, user_id, RoleEnum.assistant, msg)
    >             add_chat_to_redis(user_id, "assistant", msg)
    >             return {"messages": [{"role": "assistant", "type": "text", "content": msg}]}
    >     
    >         def _handle_post_request(self, db, user_id, message, context):
    >             msg = message.strip().lower()
    >             mapping = {"1": "domestic", "국내": "domestic", "2": "foreign", "해외": "foreign", "3": "both", "둘 다": "both"}
    >             target = next((v for k, v in mapping.items() if k in msg), None)
    >             if not target:
    >                 err = "❌ 게시할 대상을 인식하지 못했습니다. (예: 1, 2, 3, 국내, 해외, 둘 다)"
    >                 save_chat_message(db, user_id, RoleEnum.assistant, err)
    >                 add_chat_to_redis(user_id, "assistant", err)
    >                 return {"messages": [{"role": "assistant", "type": "text", "content": err}]}
    >     
    >             update_user_context(user_id, {"post_target": target, "stage": "step6"})
    >             success = asyncio.run(post_to_spring_board(
    >                 user_id=int(user_id),
    >                 platform=context.get("platform", ""),
    >                 title=context.get("post_title_kr", ""),
    >                 content=context.get("post_content_kr", ""),
    >                 translated_title=context.get("translated_title", ""),
    >                 translated_content=context.get("translated_content", ""),
    >                 target=target
    >             ))
    >     
    >             if success:
    >                 msg = f"제목(영문): {context['translated_title']}\n내용(영문): {context['translated_content']}\n"
    >                 msg += f"{'국내와 해외' if target=='both' else target} 게시 완료! 😊"
    >             else:
    >                 msg = "❌ 게시글 등록 중 오류 발생"
    >     
    >             save_chat_message(db, user_id, RoleEnum.assistant, msg)
    >             add_chat_to_redis(user_id, "assistant", msg)
    >             return {"messages": [{"role": "assistant", "type": "text", "content": msg}]}
    >     
    >         def _handle_slide_step(self, db, user_id, context):
    >             result = get_slide_message_gpt(user_id, context["platform"], context.get("slide_idx", 0))
    >             if not result:
    >                 return {"messages": [{"role": "assistant", "type": "text", "content": "슬라이드 불러오기 오류"}]}
    >     
    >             slide_index = context.get("slide_idx", 0) + 1
    >             save_chat_message(db, user_id, RoleEnum.assistant, result["text"])
    >             add_chat_to_redis(user_id, "assistant", result["text"])
    >     
    >             return {
    >                 "messages": [
    >                     {"role": "assistant", "type": "image", "content": result["image"]},
    >                     {"role": "assistant", "type": "text", "content": result["text"] + "\n\n👉 다음으로 넘어가려면 '다음'이라고 입력해 주세요!"}
    >                 ]
    >             }
    >     
    >         def update_context_from_message(self, db, user_id: str, message: str):
    >             context = get_user_context(user_id)
    >             print(f"{context} : 확인")
    >             msg = message.strip().lower()
    >     
    >             if context.get("stage") == "step3" and msg in ["다음", "next", "다음 슬라이드", "넘겨줘"]:
    >                 current = context.get("slide_idx", 0)
    >     
    >                 if is_last_slide(context.get("platform"), current):
    >                     print("📘 슬라이드 마지막 도달 → step4로 이동")
    >                     update_user_context(user_id, {"stage": "step4", "slide_idx": 0})
    >                 else:
    >                     update_user_context(user_id, {"slide_idx": current + 1})
    >                     print(f"📸 슬라이드 {current + 1}로 이동")
    >                 return
    >     
    >             # ✅ step3: 슬라이드 종료 문장 명시적으로 말한 경우
    >             if context.get("stage") == "step3":
    >                 lower_msg = message.lower()
    >                 if "슬라이드" in lower_msg and any(kw in lower_msg for kw in ["끝", "종료", "다음", "넘어", "그만"]):
    >                     update_user_context(user_id, {"stage": "step4", "slide_idx": 0})
    >                     print("📘 슬라이드 종료 문장 감지 → step4로 이동")
    >                     return
    >     
    >             # ✅ step4 (제목+내용 입력 처리)
    >             # Step4: 판매글 입력 → 번역 → "이대로 게시할까요?" 안내, stage=step5
    >             if context.get("stage") == "step4" and ("제목" in message or "내용" in message):
    >                 try:
    >                     print("🔎 제목/내용 자동 추출")
    >                     title_kr, content_kr = extract_title_content_with_gpt(user_id, message)
    >                     if not (title_kr or content_kr):
    >                         raise ValueError("제목/내용 둘 다 추출 실패")
    >                 except Exception as e:
    >                     err = f"❌ 판매글에서 제목/내용을 추출하지 못했어요. 다시 입력해 주세요! ({e})"
    >                     save_chat_message(db, user_id, RoleEnum.assistant, err)
    >                     add_chat_to_redis(user_id, "assistant", err)
    >                     return {"messages": [{"role": "assistant", "content": err}]}
    >     
    >                 # 영어 번역
    >                 try:
    >                     print("🔵 GPT 번역 중 …")
    >                     en_title, en_content = translate_post(user_id, title_kr, content_kr)
    >                 except Exception as e:
    >                     err = "❌ 번역 중 오류가 발생했어요. 다시 시도해 주세요!"
    >                     save_chat_message(db, user_id, RoleEnum.assistant, err)
    >                     add_chat_to_redis(user_id, "assistant", err)
    >                     return {"messages": [{"role": "assistant", "content": err}]}
    >     
    >                 # 컨텍스트 저장 및 안내
    >                 update_user_context(user_id, {
    >                     "post_title_kr": title_kr,
    >                     "post_content_kr": content_kr,
    >                     "translated_title": en_title,
    >                     "translated_content": en_content,
    >                 })
    >                 reply = (
    >                     f"✅ 번역이 완료되었어요!\n\n"
    >                     f"📌 [한글 제목] {title_kr}\n🌍 [영문 제목] {en_title}\n\n"
    >                     f"📌 [한글 내용] {content_kr}\n🌍 [영문 내용] {en_content}\n\n"
    >                     "👉 이대로 게시할까요? (네/아니요)"
    >                 )
    >                 save_chat_message(db, user_id, RoleEnum.assistant, reply)
    >                 add_chat_to_redis(user_id, "assistant", reply)
    >                 return {"messages": [{"role": "assistant", "content": reply}]}
    >             
    >             # ✅ step4: '이대로 게시할까요?'에 대한 답변 처리
    >             if context.get("stage") == "step4" and ("국내" in msg or "해외" in msg or "둘 다" in msg):
    >                 domestic_list = ["국내", "1", "domestic"]
    >                 foreign_list = ["해외", "2", "foreign"]
    >                 both_list = ["둘 다", "3", "both"]
    >     
    >                 if any(k in msg for k in domestic_list):
    >                     update_user_context(user_id, {"stage": "step5"})
    >                     return  # handle()에서 step5 진입 처리됨
    >     
    >                 elif any(k in msg for k in foreign_list):                
    >                     update_user_context(user_id, {"stage": "step5"})
    >                     return  # handle()에서 step5 진입 처리됨
    >                 elif any(k in msg for k in both_list):                
    >                     update_user_context(user_id, {"stage": "step5"})
    >                     return  # handle()에서 step5 진입 처리됨    
    >     
    >             # Step5: "네/아니요" 대답 → 자동 게시 or 취소
    >             if context.get("stage") == "step5":
    >                 msg_norm = msg.replace(' ', '')
    >                 if msg_norm in ["네", "yes", "y"]:
    >                     # 국내+해외 자동 게시
    >                     update_user_context(user_id, {"post_target": "both", "stage": "step6"})
    >                     success = asyncio.run(post_to_spring_board(
    >                         user_id=int(user_id),
    >                         platform=context.get("platform", ""),
    >                         title=context.get("post_title_kr", ""),
    >                         content=context.get("post_content_kr", ""),
    >                         translated_title=context.get("translated_title", ""),
    >                         translated_content=context.get("translated_content", ""),
    >                         target="both"
    >                     ))
    >                     if success:
    >                         res_msg = (
    >                             f"✅ 게시 완료!\n"
    >                             f"- 제목(영문): {context['translated_title']}\n"
    >                             f"- 내용(영문): {context['translated_content']}\n"
    >                             f"👉 국내와 해외 게시판에 모두 등록했어요!"
    >                         )
    >                     else:
    >                         res_msg = "❌ 게시글 등록 중 오류가 발생했어요."
    >                     save_chat_message(db, user_id, RoleEnum.assistant, res_msg)
    >                     add_chat_to_redis(user_id, "assistant", res_msg)
    >                     return {"messages": [{"role": "assistant", "content": res_msg}]}
    >                 else:
    >                     # 취소
    >                     update_user_context(user_id, {"stage": "start"})
    >                     cancel_msg = "게시가 취소되었습니다. 처음부터 다시 시작할 수 있습니다."
    >                     save_chat_message(db, user_id, RoleEnum.assistant, cancel_msg)
    >                     add_chat_to_redis(user_id, "assistant", cancel_msg)
    >                     return {"messages": [{"role": "assistant", "content": cancel_msg}]}
    >     
    >             # ✅ 처음 시작: item 입력
    >             if context.get("stage") in [None, "start"] or "item" not in context:
    >                 update_user_context(user_id, {"item": message, "stage": "step1"})
    >                 print("대화 시작 → step1 진입")
    >                 return
    >     
    >             # ✅ step1 → step2: country 저장
    >             if context.get("stage") == "step1" or "country" not in context:
    >                 update_user_context(user_id, {"country": message, "stage": "step2"})
    >                 print("🧭 초기 품목 입력 → step1 진입")
    >                 return
    >     
    >             if context.get("stage") == "step4" or "country" not in context:
    >                 update_user_context(user_id, {"country": message, "stage": "step2"})
    >                 print("🧭 초기 품목 입력 → step1 진입")
    >                 return
    >     
    >             # ✅ step2 → step3: platform 선택
    >             if context.get("stage") == "step2" or "platform" not in context:
    >                 print("🌍 국가 선택 완료 → step3 진입")
    >                 platform = None
    >                 if "amazon" in msg or "아마존" in msg or msg == "1":
    >                     platform = "amazon"
    >                 elif "shopee" in msg or "쇼피" in msg or msg == "2":
    >                     platform = "shopee"
    >     
    >                 if platform:
    >                     update_user_context(user_id, {"platform": platform, "stage": "step3", "slide_idx": 0})
    >                     print(f"🛒 플랫폼 선택 → {platform} / step3 슬라이드 진입")
    >                 return
    >     
    >             # ✅ step6 → 다시 등록 요청 시 step5로 복귀
    >             if context.get("stage") == "step6" and any(kw in msg for kw in ["다시", "재등록", "등록해줘", "한 번 더"]):
    >                 if context.get("post_title_kr") and context.get("post_content_kr"):
    >                     update_user_context(user_id, {"stage": "step5"})
    >                     print("🔁 게시 재등록 요청 감지 → step5로 복귀")
    >                 return
    >     
    >         def build_prompt(self, context: dict, history: list, message: str, slide_text: str = "") -> str:
    >             # 🔵 원래는 전체 prompt 만들어서 return 했지만
    >             # ✅ 이제는 "GPT 시스템 지시문"만 반환하면 됨
    >             # 참고로 slide_text는 system_prompt 안에서 붙일 수 있음
    >     
    >             # Step1 국가 추천 → 슬라이드 텍스트 붙이기
    >             if context.get("stage") == "step1" and "item" in context:
    >                 slide_text += self.get_step1_country_list_text(context["item"])
    >     
    >             # Step2 플랫폼 추천
    >             elif context.get("stage") == "step2" and "country" in context:
    >                 slide_text += self.get_step2_platform_text(context["country"])
    >     
    >             return SYSTEM_PROMPT + "\n\n" + slide_text
    >     
    >         def get_step1_country_list_text(self, item: str) -> str:
    >             results = get_top_country_details(item)
    >             if not results:
    >                 return "\n\n❗ 해당 품목에 대한 수출 데이터를 찾을 수 없어요. 다시 입력해 주세요."
    >     
    >             lines = [
    >                 f"{r['순위']}. {r['국가']} ({r['성공확률']}%) - {r['추천이유']}"
    >                 for r in results
    >             ]
    >             text = "\n".join(lines)
    >     
    >             return f"\n\n📦 [수출 유망 국가 TOP 20 - {item} 기준]\n{text}\n\n💬 관심 있는 국가를 선택해 주세요!"
    >     
    >         def get_step2_platform_text(self, country: str) -> str:
    >             country = country.strip()
    >     
    >             is_shopee = country in SHOPEE_COUNTRIES
    >             is_amazon = True  # Amazon은 모든 국가 허용
    >     
    >             platforms = []
    >             if is_amazon:
    >                 platforms.append("Amazon")
    >             if is_shopee:
    >                 platforms.append("Shopee")
    >     
    >             # 플랫폼 설명 문구 생성
    >             if not platforms:
    >                 return f"{country}에서는 현재 추천할 수 있는 대표적인 플랫폼이 없습니다. 다른 국가를 선택해보시는 것도 좋아요."
    >     
    >             if len(platforms) == 1:
    >                 return f"{country}에서는 **{platforms[0]}** 플랫폼을 통해 판매하시는 것이 적절합니다. 이 플랫폼의 특징과 사용법을 알려드릴게요!"
    >             else:
    >                 return f"{country}에서는 **Amazon**과 **Shopee** 두 플랫폼 모두 활용하실 수 있어요. 각각의 특징을 비교하고 선택하시면 좋겠습니다 😊"
    >     
    >         @staticmethod
    >         def convert_to_gpt_format(history):
    >             formatted = []
    >             for h in history:
    >                 if isinstance(h, dict):
    >                     formatted.append({
    >                         "role": h.get("role"),
    >                         "content": h.get("content")
    >                     })
    >                 else:  # ChatbotMessage 객체 (RDB)
    >                     formatted.append({
    >                         "role": h.role.value if hasattr(h.role, "value") else h.role,
    >                         "content": h.content
    >                     })
    >             return formatted
    >     
    >     ```
    >     
    > - 챗봇 자동게시
    >     
    >     ```java
    >     package com.globalgo.globalgo.chatbot;
    >     
    >     import com.globalgo.globalgo.chatbot.dto.PostTranslationRequest;
    >     import com.globalgo.globalgo.post.domestic.DomesticPostService;
    >     import com.globalgo.globalgo.post.foreign.ForeignPostService;
    >     import io.swagger.v3.oas.annotations.tags.Tag;
    >     import lombok.RequiredArgsConstructor;
    >     import org.springframework.http.ResponseEntity;
    >     import org.springframework.web.bind.annotation.*;
    >     
    >     @RestController
    >     @RequiredArgsConstructor
    >     @RequestMapping("/api/step5")
    >     @Tag(name = "챗봇전용 상품게시 API", description = "챗봇전용 상품 게시 API")
    >     public class ChatbotPostController {
    >     
    >         private final DomesticPostService domesticPostService;
    >         private final ForeignPostService foreignPostService;
    >     
    >         @PostMapping("/post")
    >         public ResponseEntity<String> postTranslated(@RequestBody PostTranslationRequest request) {
    >             System.out.println("✅✅✅ ChatbotPostController 진입 확인");
    >             Long userId = request.getUserId();
    >     
    >             if (request.getTarget().contains("domestic") || request.getTarget().contains("both")) {
    >                 domesticPostService.create(userId, request.getPlatform(), request.getTitle(), request.getContent());
    >             }
    >     
    >             if (request.getTarget().contains("foreign") || request.getTarget().contains("both")) {
    >                 foreignPostService.create(userId, request.getPlatform(), request.getTranslatedTitle(), request.getTranslatedContent());
    >             }
    >     
    >             return ResponseEntity.ok("게시 성공");
    >         }
    >     }
    >     
    >     ```
    >     
    
    ---
    
    > **📦 마이 페이지**
    > 
    > 
    > UserController.java
    > 
    > - 코드
    >     
    >     ```java
    >     package com.globalgo.globalgo.user;
    >     
    >     import com.globalgo.globalgo.company.CompanyService;
    >     import com.globalgo.globalgo.company.dto.CompanyResponse;
    >     import com.globalgo.globalgo.company.dto.CompanyUpdateRequest;
    >     import com.globalgo.globalgo.user.dto.MyPageResponse;
    >     import com.globalgo.globalgo.user.dto.UserResponse;
    >     import com.globalgo.globalgo.user.dto.UserUpdateRequest;
    >     import io.swagger.v3.oas.annotations.Operation;
    >     import io.swagger.v3.oas.annotations.Parameter;
    >     import io.swagger.v3.oas.annotations.responses.ApiResponse;
    >     import io.swagger.v3.oas.annotations.security.SecurityRequirement;
    >     import io.swagger.v3.oas.annotations.tags.Tag;
    >     import lombok.RequiredArgsConstructor;
    >     import org.springframework.http.ResponseEntity;
    >     import org.springframework.security.core.annotation.AuthenticationPrincipal;
    >     import org.springframework.security.core.userdetails.UserDetails;
    >     import org.springframework.web.bind.annotation.*;
    >     
    >     @RestController
    >     @RequestMapping("/api/users")
    >     @RequiredArgsConstructor
    >     @Tag(name = "회원 API", description = "회원 정보 조회, 마이페이지, 닉네임 수정 등 유저 관련 API")
    >     public class UserController {
    >     
    >         private final UserService userService;
    >         private final CompanyService companyService;
    >     
    >         /**
    >          * 현재 로그인한 사용자 정보 조회 //
    >          * ✅ 최소 유저 정보
    >          * ex) 홍길동님 환영합니다!
    >          */
    >         @GetMapping("/me")
    >         @Operation(summary = "현재 사용자 정보 조회", description = "AccessToken 기반으로 로그인한 사용자의 정보를 반환합니다.")
    >         @ApiResponse(responseCode = "200", description = "사용자 정보 조회 성공")
    >         public ResponseEntity<UserResponse> getCurrentUser(
    >                 @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
    >     
    >             String email = userDetails.getUsername();
    >             User user = userService.findByEmail(email)
    >                     .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));
    >     
    >             return ResponseEntity.ok(new UserResponse(user));
    >         }
    >     
    >         /**
    >          * 사용자 정보 수정
    >          */
    >         @SecurityRequirement(name = "bearerAuth")
    >         @PutMapping("/me")
    >         @Operation(summary = "회원정보 수정", description = "현재 로그인한 사용자의 닉네임, 이름, 전화번호, 생년월일을 수정합니다.")
    >         @ApiResponse(responseCode = "200", description = "회원정보 수정 성공")
    >         public ResponseEntity<UserResponse> updateUserInfo(
    >                 @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
    >                 @RequestBody UserUpdateRequest request) {
    >     
    >             String email = userDetails.getUsername();
    >             User updatedUser = userService.updateUserInfo(email, request);
    >             return ResponseEntity.ok(new UserResponse(updatedUser));
    >         }
    >     
    >         /**
    >          * 마이페이지 정보 조회 //
    >          * ✅ 마이페이지용 응답
    >          * ex) 내가 작성한 게시글
    >          */
    >         @SecurityRequirement(name = "bearerAuth")
    >         @GetMapping("/mypage")
    >         @Operation(summary = "마이페이지 조회", description = "현재 로그인한 사용자의 마이페이지 정보를 반환합니다.")
    >         @ApiResponse(responseCode = "200", description = "마이페이지 정보 조회 성공")
    >         public ResponseEntity<MyPageResponse> getMyPage(
    >                 @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
    >     
    >             String email = userDetails.getUsername();
    >             User user = userService.findByEmail(email)
    >                     .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));
    >     
    >             return ResponseEntity.ok(new MyPageResponse(user));
    >         }
    >     
    >         @SecurityRequirement(name = "bearerAuth")
    >         @Operation(summary = "회사 정보 조회", description = "현재 로그인한 사용자의 회사 정보를 조회합니다.")
    >         @GetMapping("/company")
    >         public ResponseEntity<CompanyResponse> getCompanyInfo(
    >                 @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails) {
    >     
    >             String email = userDetails.getUsername();
    >             CompanyResponse companyInfo = companyService.getCompanyInfoByUserEmail(email);
    >             return ResponseEntity.ok(companyInfo);
    >         }
    >     
    >         @SecurityRequirement(name = "bearerAuth")
    >         @Operation(summary = "회사 정보 수정", description = "현재 로그인한 사용자의 회사 정보를 수정합니다.")
    >         @PutMapping("/company")
    >         public ResponseEntity<CompanyResponse> updateCompanyInfo(
    >                 @Parameter(hidden = true) @AuthenticationPrincipal UserDetails userDetails,
    >                 @RequestBody CompanyUpdateRequest request) {
    >     
    >             String email = userDetails.getUsername();
    >             User user = userService.findByEmail(email)
    >                     .orElseThrow(() -> new RuntimeException("사용자 정보 없음"));
    >             CompanyResponse updated = companyService.updateCompanyInfo(user, request);
    >             return ResponseEntity.ok(updated);
    >         }
    >     
    >     }
    >     
    >     ```
    >     
    > 
    > ---
    >
