package com.globalgo.globalgo.favorite;

import com.globalgo.globalgo.favorite.dto.FavoriteRequest;
import com.globalgo.globalgo.favorite.dto.FavoriteResponse;
import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@Tag(name = "즐겨찾기 API", description = "즐겨찾기 추가 및 삭제, 목록조회 관련 API")
public class FavoriteController {

    private final FavoriteService favoriteSer;
    private final UserService userService; // email로 유저 조회하기 위해 추가

    // 즐겨찾기 토글
    @PostMapping("/toggle")
    @Operation(summary = "즐겨찾기 추가 삭제", description = "즐겨찾기 추가 및 삭제")
    public void toggleFavorite(@RequestBody FavoriteRequest requestDto,
                               @AuthenticationPrincipal UserDetails userDetails) {
        // 로그인된 사용자 email 가져오기
        String email = userDetails.getUsername();

        // DB에서 User 엔티티 조회
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));

        favoriteSer.toggleFavorite(user.getId(), requestDto);
    }

    // 즐겨찾기 목록 조회
    @GetMapping
    @Operation(summary = "즐겨찾기 목록조회", description = "즐겨찾기 목록조회")
    public List<FavoriteResponse> getFavorites(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));

        return favoriteSer.getFavoriteList(user.getId());
    }
}
