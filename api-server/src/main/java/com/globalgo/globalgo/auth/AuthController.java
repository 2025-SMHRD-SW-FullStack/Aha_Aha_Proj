package com.globalgo.globalgo.auth;

import com.globalgo.globalgo.email.EmailSenderService;
import com.globalgo.globalgo.email.EmailVerificationService;
import com.globalgo.globalgo.email.EmailVerificationToken;
import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserService;
import com.globalgo.globalgo.user.dto.UserRequest;
import com.globalgo.globalgo.user.dto.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "인증 API", description = "회원가입, 로그인, 이메일 인증 등 인증 관련 API")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final EmailVerificationService emailVerificationService;
    private final EmailSenderService emailSenderService;

    @PostMapping("/signup")
    @Operation(summary = "회원가입", description = "일반 회원가입. 이메일 인증 메일 발송됨.")
    public ResponseEntity<UserResponse> signup(@RequestBody UserRequest request) {
        // 1. 유저 등록 (enabled=false)
        User user = User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .nickname(request.getNickname())
                .build();

        User saved = userService.signup(user);

        // 2. 이메일 인증 토큰 생성
        EmailVerificationToken token = emailVerificationService.createVerificationToken(saved.getEmail());

        // 3. 이메일 전송
        emailSenderService.sendVerificationEmail(saved.getEmail(), token.getToken());

        // 4. 응답 (JWT 발급 X: 아직 인증 안 됐으니까)
        return ResponseEntity.ok(new UserResponse(
                saved.getId(), saved.getEmail(), saved.getNickname(), null
        ));
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "이메일/비밀번호 기반 로그인")
    public ResponseEntity<UserResponse> login(@RequestBody UserRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userService.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtTokenProvider.createToken(user.getEmail());

        return ResponseEntity.ok(new UserResponse(
                user.getId(), user.getEmail(), user.getNickname(), token));
    }

    @GetMapping("/verify-email")
    @Operation(summary = "이메일 인증", description = "발급된 이메일 인증 토큰으로 계정 활성화")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        emailVerificationService.verifyToken(token);
        return ResponseEntity.ok("이메일 인증이 완료되었습니다. 이제 로그인할 수 있습니다.");
    }

}
