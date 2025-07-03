package com.globalgo.globalgo.favorite.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

// 즐겨찾기 응답 DTO (마이페이지 목록 등)

@Getter
@Setter
@Builder
public class FavoriteResponse {
    private Long favoriteId;
    private Long productItemId;
    private String productName; // 예: 상품 이름
    private String productCode; // 예: HS 코드
}
