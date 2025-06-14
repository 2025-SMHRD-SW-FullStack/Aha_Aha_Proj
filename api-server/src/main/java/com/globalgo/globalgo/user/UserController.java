package com.globalgo.globalgo.user;

import com.globalgo.globalgo.user.dto.MyPageResponse;
import com.globalgo.globalgo.user.dto.UserResponse;
import com.globalgo.globalgo.user.dto.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 👤 현재 사용자 정보 조회
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();

        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));

        return ResponseEntity.ok(new UserResponse(user));
    }

    // ✏️ 닉네임 수정
    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateNickname(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UserUpdateRequest request) {

        String email = userDetails.getUsername();
        User updatedUser = userService.updateNickname(email, request.getNickname());
        return ResponseEntity.ok(new UserResponse(updatedUser));
    }

    // 🧾 마이페이지 응답
    @GetMapping("/mypage")
    public ResponseEntity<MyPageResponse> getMyPage(
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));

        return ResponseEntity.ok(new MyPageResponse(user));
    }
}

