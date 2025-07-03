package com.globalgo.globalgo.favorite;

import com.globalgo.globalgo.favorite.dto.FavoriteResponse;
import com.globalgo.globalgo.product.ProductItem;
import com.globalgo.globalgo.product.ProductItemRepository;
import com.globalgo.globalgo.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepo;
    private final ProductItemRepository productRep;

    // 즐겨찾기 토글 메서드
    @Transactional
    public boolean toggleFavorite(User user, Long productItemId) {
        // 이미 즐겨찾기 되어있는지 확인
        Optional<Favorite> existing = favoriteRepo.findByUserIdAndProductItemId(user.getId(), productItemId);

        if (existing.isPresent()) {
            favoriteRepo.delete(existing.get());
            return false; // 제거됨
        }

        // 최대 10개 제한 확인
        Long count = favoriteRepo.countByUserId(user.getId());
        if (count >= 10) {
            throw new IllegalStateException("즐겨찾기는 최대 10개까지 가능합니다.");
        }

        // 상품 존재 여부 확인
        ProductItem productItem = productRep.findById(productItemId)
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));

        // 새 즐겨찾기 추가
        Favorite favorite = Favorite.builder()
                .user(user)
                .productItem(productItem)
                .build();
        favoriteRepo.save(favorite);
        return true; // 추가됨
    }

    // 사용자 즐겨찾기 목록 조회
    @Transactional
    public List<FavoriteResponse> getFavorites(User user) {
        List<Favorite> favorites = favoriteRepo.findAllByUserId(user.getId());
        return favorites.stream()
                .map(fav -> FavoriteResponse.builder()
                        .favoriteId(fav.getId())
                        .productItemId(fav.getProductItem().getId())
                        .productName(fav.getProductItem().getName())
                        .productCode(fav.getProductItem().getCode())
                        .build())
                .collect(Collectors.toList());
    }
}
