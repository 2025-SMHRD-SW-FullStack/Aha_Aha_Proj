package com.globalgo.globalgo.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductSortRepository extends JpaRepository<ProductSort, ProductSortId> {
    List<ProductSort> findByProductItem(ProductItem productItem);
}
