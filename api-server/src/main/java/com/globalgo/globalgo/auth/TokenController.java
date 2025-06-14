package com.globalgo.globalgo.auth;

import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserService;
import com.globalgo.globalgo.user.dto.LoginResponse;
import com.globalgo.globalgo.user.dto.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "토큰 API", description = "AccessToken 재발급")
public class TokenController {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;

    @PostMapping("/refresh")
    @Operation(summary = "AccessToken 재발급", description = "만료된 AccessToken을 RefreshToken을 이용해 재발급합니다.")
    public ResponseEntity<LoginResponse> refresh(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 refreshToken 추출
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        // 2. 쿠키에 토큰 없으면 401
        if (refreshToken == null) {
            return ResponseEntity.status(401).build();
        }

        // 3. 토큰 유효성 검사
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(401).build();
        }

        // 4. 사용자 이메일 추출
        String email = jwtTokenProvider.getUserId(refreshToken);

        // 5. DB에 저장된 RefreshToken과 일치하는지 확인
        RefreshToken savedToken = refreshTokenRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("저장된 리프레시 토큰이 없습니다."));

        if (!savedToken.getToken().equals(refreshToken) || savedToken.isExpired()) {
            return ResponseEntity.status(401).build();
        }

        // 6. 새로운 토큰 생성
        String newAccessToken = jwtTokenProvider.createAccessToken(email);
        String newRefreshToken = jwtTokenProvider.createRefreshToken(email);

        // 7. DB 업데이트
        RefreshToken newToken = new RefreshToken(email, newRefreshToken, LocalDateTime.now().plusDays(14));
        refreshTokenRepository.save(newToken);

        // 8. 쿠키도 새로 갱신
        Cookie newCookie = new Cookie("refreshToken", newRefreshToken);
        newCookie.setHttpOnly(true);
        newCookie.setPath("/");
        newCookie.setMaxAge(60 * 60 * 24 * 14); // 14일
        response.addCookie(newCookie);

        // 9. 유저 정보 응답에 포함
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("유저 정보를 찾을 수 없습니다."));

        return ResponseEntity.ok(new LoginResponse(newAccessToken, new UserResponse(user)));
    }

}