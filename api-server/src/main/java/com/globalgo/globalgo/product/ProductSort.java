package com.globalgo.globalgo.product;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_sort")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSort {

    @EmbeddedId
    private ProductSortId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productItemId")
    @JoinColumn(name = "product_item_id")
    private ProductItem productItem;

//    @Column(nullable = false)
//    private String country;

    private Integer rank;

    private Double percent;

    @Column(length = 1000)
    private String reason;
}
