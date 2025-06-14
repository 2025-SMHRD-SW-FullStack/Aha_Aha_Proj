package com.globalgo.globalgo.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "회원 정보 수정 요청 DTO")
public class UserUpdateRequest {

    @Schema(description = "변경할 닉네임", example = "글로벌고짱")
    private String nickname;
}
