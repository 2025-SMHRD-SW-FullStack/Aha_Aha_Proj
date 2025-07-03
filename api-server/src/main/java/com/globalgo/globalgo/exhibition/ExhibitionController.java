package com.globalgo.globalgo.exhibition;

import com.globalgo.globalgo.exhibition.dto.PostResponse;
import com.globalgo.globalgo.post.domestic.DomesticPost;
import com.globalgo.globalgo.post.domestic.DomesticPostRepository;
import com.globalgo.globalgo.post.foreign.ForeignPost;
import com.globalgo.globalgo.post.foreign.ForeignPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exhibition")
@RequiredArgsConstructor
public class ExhibitionController {

    private final DomesticPostRepository domesticPostRepository;
    private final ForeignPostRepository foreignPostRepository;

    // ✅ 내 전시관 (내 userId 기반)
    @GetMapping("/mine/{userId}")
    public ResponseEntity<Map<String, List<PostResponse>>> getMyPosts(@PathVariable Long userId) {
        return ResponseEntity.ok(fetchPostsByUserId(userId));
    }

    // ✅ 특정 유저 전시관
    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, List<PostResponse>>> getUserPosts(@PathVariable Long userId) {
        return ResponseEntity.ok(fetchPostsByUserId(userId));
    }

    // ✅ 전체 공개 전시관
    @GetMapping("/public")
    public ResponseEntity<Map<String, List<PostResponse>>> getAllPosts() {
        List<DomesticPost> domestic = domesticPostRepository.findAll();
        List<ForeignPost> foreign = foreignPostRepository.findAll();

        return ResponseEntity.ok(Map.of(
                "domestic", domestic.stream().map(PostResponse::from).toList(),
                "foreign", foreign.stream().map(PostResponse::from).toList()
        ));
    }

    // ✅ 공통 로직 (내 글/유저 글에서 사용)
    private Map<String, List<PostResponse>> fetchPostsByUserId(Long userId) {
        List<DomesticPost> domestic = domesticPostRepository.findByUserId(userId);
        List<ForeignPost> foreign = foreignPostRepository.findByUserId(userId);

        return Map.of(
                "domestic", domestic.stream().map(PostResponse::from).toList(),
                "foreign", foreign.stream().map(PostResponse::from).toList()
        );
    }
}
