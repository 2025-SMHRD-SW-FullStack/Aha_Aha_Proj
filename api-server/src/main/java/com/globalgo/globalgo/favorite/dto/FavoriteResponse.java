package com.globalgo.globalgo.favorite.dto;

import com.globalgo.globalgo.product.ProductItem;
import com.globalgo.globalgo.product.ProductSort;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class FavoriteResponse {

    private Long favoriteId;
    private Long productItemId;
    private String productName;
    private String productCode;
    private String productDescription;
    private List<ProductSortDto> recommendedCountries;

    @Getter
    @Builder
    public static class ProductSortDto {
        private String country;
        private Integer rank;
        private Double percent;
        private String reason;
    }

    public static FavoriteResponse from(ProductItem productItem, Long favoriteId, List<ProductSort> productSortList) {
        return FavoriteResponse.builder()
                .favoriteId(favoriteId)
                .productItemId(productItem.getId())
                .productName(productItem.getName())
                .productCode(productItem.getCode())
                .productDescription(productItem.getDescription())
                .recommendedCountries(productSortList.stream()
                        .map(sort -> ProductSortDto.builder()
                                .country(sort.getId().getCountry())
                                .rank(sort.getRank())
                                .percent(sort.getPercent())
                                .reason(sort.getReason())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
