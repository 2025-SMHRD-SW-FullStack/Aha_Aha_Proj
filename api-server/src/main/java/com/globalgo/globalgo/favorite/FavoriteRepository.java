package com.globalgo.globalgo.favorite;

import com.globalgo.globalgo.product.ProductItem;
import com.globalgo.globalgo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    boolean existsByUserAndProductItem(User user, ProductItem productItem);
    Optional<Favorite> findByUserAndProductItem(User user, ProductItem productItem);
    List<Favorite> findAllByUser(User user);
}
