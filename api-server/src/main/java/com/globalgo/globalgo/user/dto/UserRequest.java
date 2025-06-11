package com.globalgo.globalgo.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRequest {
    private String email;
    private String password;
    private String nickname; // 회원가입 시에만 사용
}