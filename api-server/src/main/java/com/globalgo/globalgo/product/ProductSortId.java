package com.globalgo.globalgo.product;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductSortId implements Serializable {

    private Long productItemId;
    private String country;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductSortId)) return false;
        ProductSortId that = (ProductSortId) o;
        return Objects.equals(productItemId, that.productItemId) &&
                Objects.equals(country, that.country);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productItemId, country);
    }
}
