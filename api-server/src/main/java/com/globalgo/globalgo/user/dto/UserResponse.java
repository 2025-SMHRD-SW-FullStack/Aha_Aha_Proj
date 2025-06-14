package com.globalgo.globalgo.user.dto;

import com.globalgo.globalgo.auth.AuthProvider;
import com.globalgo.globalgo.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "사용자 응답 DTO")
public class UserResponse {

    @Schema(description = "사용자 ID", example = "1")
    private Long id;

    @Schema(description = "이메일", example = "test@example.com")
    private String email;

    @Schema(description = "닉네임", example = "홍길동")
    private String nickname;

    @Schema(description = "소셜 제공자 (LOCAL, GOOGLE 등)", example = "LOCAL")
    private String provider;

    @Schema(description = "소셜 로그인 사용자인지 여부", example = "false")
    private boolean isSocialUser;

    public UserResponse(User user, boolean isSocialUser) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.provider = user.getProvider() != null ? user.getProvider().name() : null;
        this.isSocialUser = isSocialUser;
    }

    // 기존 생성자도 유지 가능 (테스트용)
    public UserResponse(User user) {
        this(user, user.getProvider() != null && user.getProvider() != AuthProvider.LOCAL);
    }
}