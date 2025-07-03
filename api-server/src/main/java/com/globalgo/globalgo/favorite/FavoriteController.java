package com.globalgo.globalgo.favorite;

import com.globalgo.globalgo.favorite.dto.FavoriteRequest;
import com.globalgo.globalgo.favorite.dto.FavoriteResponse;
import com.globalgo.globalgo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteSer;

    // 즐겨찾기 토글
    @PostMapping("/toggle")
    public String toggleFavorite(@AuthenticationPrincipal User user,
                                 @RequestBody FavoriteRequest requestDTO) {
        boolean added = favoriteSer.toggleFavorite(user, requestDTO.getProductItemId());
        return added ? "즐겨찾기에 추가되었습니다." : "즐겨찾기에서 제거되었습니다.";
    }

    // 마이페이지 즐겨찾기 목록
    @GetMapping
    public List<FavoriteResponse> getFavorites(@AuthenticationPrincipal User user) {
        return favoriteSer.getFavorites(user);
    }
}
