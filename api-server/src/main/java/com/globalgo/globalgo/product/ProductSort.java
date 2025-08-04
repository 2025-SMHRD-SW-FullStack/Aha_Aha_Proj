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

    @Column(name = "`rank`")
    private Integer rank;

    private String percent;

    @Column(length = 1000)
    private String reason;

    @Column(name="product_item_name")
    private String product_item_name;

    @Column(name = "ecommerce")
    private String ecommerce;
}
