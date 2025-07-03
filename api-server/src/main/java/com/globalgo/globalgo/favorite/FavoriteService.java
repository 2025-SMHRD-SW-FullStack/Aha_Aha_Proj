package com.globalgo.globalgo.favorite;

import com.globalgo.globalgo.favorite.dto.FavoriteRequest;
import com.globalgo.globalgo.favorite.dto.FavoriteResponse;
import com.globalgo.globalgo.product.ProductItem;
import com.globalgo.globalgo.product.ProductItemRepository;
import com.globalgo.globalgo.product.ProductSortRepository;
import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRep;
    private final ProductItemRepository proItemRep;
    private final ProductSortRepository proSortRep;
    private final UserRepository userRep;

    @Transactional
    public void toggleFavorite(Long userId, FavoriteRequest requestDto) {
        User user = userRep.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        ProductItem productItem = proItemRep.findById(requestDto.getProductItemId())
                .orElseThrow(() -> new RuntimeException("상품 없음"));

        boolean exists = favoriteRep.existsByUserAndProductItem(user, productItem);

        if (exists) {
            Favorite favorite = favoriteRep.findByUserAndProductItem(user, productItem)
                    .orElseThrow(() -> new RuntimeException("즐겨찾기 정보 없음"));
            favoriteRep.delete(favorite);
        } else {
            Favorite favorite = Favorite.builder()
                    .user(user)
                    .productItem(productItem)
                    .build();
            favoriteRep.save(favorite);
        }
    }

    @Transactional
    public List<FavoriteResponse> getFavoriteList(Long userId) {
        User user = userRep.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        List<Favorite> favorites = favoriteRep.findAllByUser(user);

        return favorites.stream().map(fav -> {
            List<com.globalgo.globalgo.product.ProductSort> sortList =
                    proSortRep.findByProductItem(fav.getProductItem());

            return FavoriteResponse.from(fav.getProductItem(), fav.getId(), sortList);
        }).toList();
    }
}
