package com.globalgo.globalgo.slidebot.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "슬라이드 데이터")
public record Slide(

        @Schema(description = "슬라이드 번호 (0부터 시작)", example = "0")
        int page,

        @Schema(description = "슬라이드 제목", example = "아마존 입점 개요")
        String title,

        @Schema(description = "슬라이드 주요 내용", example = "아마존 셀러센터에 가입하면 판매자 계정을 개설할 수 있습니다.")
        String content,

        @Schema(description = "슬라이드 이미지 경로 (프론트에서 접근 가능)", example = "/static/images/amazon_guide/slide0.png")
        String image

) {}
