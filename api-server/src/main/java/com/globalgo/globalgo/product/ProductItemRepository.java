package com.globalgo.globalgo.product;

import com.globalgo.globalgo.product.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
    // HS 코드나 이름으로 검색할 때 사용할 수 있음
    Optional<ProductItem> findByCode(String code);
}