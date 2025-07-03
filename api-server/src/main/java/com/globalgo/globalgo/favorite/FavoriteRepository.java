package com.globalgo.globalgo.favorite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findByUserIdAndProductItemId(Long userId, Long productItemId);
    List<Favorite> findAllByUserId(Long userId);
    Long countByUserId(Long userId);
}
