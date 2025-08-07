package com.globalgo.globalgo.post.domestic;

import com.globalgo.globalgo.post.domestic.dto.DomesticPostRequest;
import com.globalgo.globalgo.post.domestic.dto.DomesticPostResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/domestic-post")
@Tag(name = "상품 국내용 API", description = "국내 게시판 관련 API")
public class DomesticPostController {

    private final DomesticPostService domesticPostService;
    private final DomesticPostRepository domesticPostRepository;

    @Operation(summary = "국내 게시글 등록", description = "사용자가 국내용 게시글을 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @PostMapping
    public ResponseEntity<String> createDomesticPost(
            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "등록할 게시글 정보",
                    required = true,
                    content = @Content(schema = @Schema(implementation = DomesticPostRequest.class))
            )
            DomesticPostRequest request) {
        domesticPostService.create(
                request.getUserId(),
                request.getTitle(),
                request.getContent(),
                request.getImg(),
                request.getUrl(),
                request.getPlatform(),
                request.getYourPrice()
        );
        return ResponseEntity.ok("게시 완료");
    }

    @Operation(summary = "전체 국내 게시글 조회", description = "모든 국내 게시글을 최신순으로 조회합니다.")
    @GetMapping("/")
    public ResponseEntity<List<DomesticPostResponse>> getAllPosts() {
        List<DomesticPost> posts = domesticPostRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        List<DomesticPostResponse> response = posts.stream()
                .map(DomesticPostResponse::from)
                .toList();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "게시글 상세 조회", description = "게시글 ID로 국내 게시글 상세 정보를 조회합니다.")
    @GetMapping("/{postId}")
    public ResponseEntity<DomesticPostResponse> getPostById(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId) {
        DomesticPost post = domesticPostRepository.findById(postId).orElseThrow();
        return ResponseEntity.ok(DomesticPostResponse.from(post));
    }

    @Operation(summary = "내 게시글 목록 조회", description = "userId로 본인의 국내 게시글만 조회합니다.")
    @GetMapping("/my")
    public ResponseEntity<List<DomesticPostResponse>> getMyPosts(
            @Parameter(description = "사용자 ID", example = "1")
            @RequestParam Long userId) {
        List<DomesticPost> posts = domesticPostRepository.findByUserId(userId);
        List<DomesticPostResponse> response = posts.stream()
                .map(DomesticPostResponse::from)
                .toList();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "국내 게시글 수정", description = "기존 게시글을 수정합니다.")
    @PatchMapping("/{postId}")
    public ResponseEntity<String> updatePost(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId,
            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "수정할 게시글 정보",
                    required = true,
                    content = @Content(schema = @Schema(implementation = DomesticPostRequest.class))
            )
            DomesticPostRequest request) {

        DomesticPost post = domesticPostRepository.findById(postId).orElseThrow();
        post.update(
                request.getTitle(),
                request.getContent(),
                request.getImg(),
                request.getUrl(),
                request.getPlatform(),
                request.getYourPrice()
        );
        domesticPostRepository.save(post);
        return ResponseEntity.ok("게시글이 수정되었습니다.");
    }

    @Operation(summary = "국내 게시글 삭제", description = "게시글 ID로 게시글을 삭제합니다.")
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId) {

        if (!domesticPostRepository.existsById(postId)) {
            return ResponseEntity.notFound().build();
        }

        domesticPostRepository.deleteById(postId);
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }

}
