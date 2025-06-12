package com.globalgo.globalgo.auth;

import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserService;
import com.globalgo.globalgo.user.dto.LoginRequest;
import com.globalgo.globalgo.user.dto.SignupRequest;
import com.globalgo.globalgo.user.dto.LoginResponse;
import com.globalgo.globalgo.user.dto.UserResponse;
import com.globalgo.globalgo.email.EmailVerificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "인증 API", description = "회원가입, 로그인")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    @Operation(summary = "회원가입", description = "이메일 인증이 완료된 사용자만 가입할 수 있습니다.")
    public ResponseEntity<UserResponse> signup(@RequestBody SignupRequest request) {
        if (!userService.isEmailVerified(request.getEmail())) {
            return ResponseEntity.status(403).build(); // 인증 안됨
        }

        User user = userService.registerUser(request);
        return ResponseEntity.ok(new UserResponse(user));
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "이메일/비밀번호 기반 로그인")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userService.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtTokenProvider.createToken(user.getEmail());

        return ResponseEntity.ok(new LoginResponse(token, new UserResponse(user)));
    }
}
