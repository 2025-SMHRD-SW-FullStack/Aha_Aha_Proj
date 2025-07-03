package com.globalgo.globalgo.favorite.dto;

import lombok.Getter;
import lombok.Setter;

// 즐겨찾기 요청 DTO (toggle 시 주로 사용)

@Getter
@Setter
public class FavoriteRequest {
    private Long productItemId;
}
