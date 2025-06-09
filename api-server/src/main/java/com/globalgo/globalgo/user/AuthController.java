package com.globalgo.globalgo.user;

import com.globalgo.globalgo.security.JwtTokenProvider;
import com.globalgo.globalgo.user.dto.UserRequest;
import com.globalgo.globalgo.user.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody UserRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .nickname(request.getNickname())
                .build();

        User saved = userService.signup(user);
        String token = jwtTokenProvider.createToken(saved.getEmail());

        return ResponseEntity.ok(new UserResponse(
                saved.getId(), saved.getEmail(), saved.getNickname(), token));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userService.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtTokenProvider.createToken(user.getEmail());

        return ResponseEntity.ok(new UserResponse(
                user.getId(), user.getEmail(), user.getNickname(), token));
    }
}
