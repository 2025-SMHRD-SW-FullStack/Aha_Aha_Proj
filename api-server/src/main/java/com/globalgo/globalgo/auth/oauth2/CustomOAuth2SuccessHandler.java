package com.globalgo.globalgo.auth.oauth2;

import com.globalgo.globalgo.auth.JwtTokenProvider;
import com.globalgo.globalgo.auth.RefreshToken;
import com.globalgo.globalgo.auth.RefreshTokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        try {
            // ✅ 디버깅 로그
            System.out.println("✅ OAuth2 로그인 성공: " + authentication.getName());

            String email = authentication.getName();

            // 토큰 발급
            String accessToken = jwtTokenProvider.createAccessToken(email);
            String refreshToken = jwtTokenProvider.createRefreshToken(email);

            // DB 저장
            refreshTokenRepository.save(new RefreshToken(email, refreshToken, LocalDateTime.now().plusDays(14)));

            // 쿠키 저장
            Cookie cookie = new Cookie("refreshToken", refreshToken);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60 * 24 * 14);
            response.addCookie(cookie);

            // ✅ 리다이렉트
            String redirectUrl = "http://localhost:5173/oauth-success?token=" + accessToken;
            System.out.println("✅ 액세스 토큰 발급 완료 → 리다이렉트: " + redirectUrl);
            response.sendRedirect(redirectUrl);

        } catch (Exception e) {
            // ❌ 예외 발생시 콘솔 출력 + 강제 리다이렉트
            System.out.println("❌ OAuth SuccessHandler 예외 발생: " + e.getMessage());
            e.printStackTrace();
            response.sendRedirect("/login?error=true");
        }
    }
}
