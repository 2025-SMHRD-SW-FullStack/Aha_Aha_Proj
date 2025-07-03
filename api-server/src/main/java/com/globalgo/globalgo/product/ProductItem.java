package com.globalgo.globalgo.product;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_item")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 상품명 (예: "자동차 부품", "화장품" 등)
    @Column(nullable = false)
    private String name;

    // HS 코드 (예: "8708", "3304" 등)
    @Column(nullable = false, unique = true)
    private String code;

    // 상품 상세 설명 (옵션)
    @Column(length = 1000)
    private String description;

}