package com.globalgo.globalgo.post.foreign;

import com.globalgo.globalgo.post.domestic.DomesticPost;
import com.globalgo.globalgo.post.domestic.dto.DomesticPostRequest;
import com.globalgo.globalgo.post.foreign.dto.ForeignPostRequest;
import com.globalgo.globalgo.post.foreign.dto.ForeignPostResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
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
@RequestMapping("/api/foreign-post")
@Tag(name = "상품 해외용 API", description = "해외 게시판 관련 API")
public class ForeignPostController {

    private final ForeignPostService foreignPostService;
    private final ForeignPostRepository foreignPostRepository;

    @Operation(summary = "해외 게시글 등록", description = "사용자가 해외용 게시글을 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @PostMapping
    public ResponseEntity<String> createForeignPost(
            @RequestBody(
                    description = "등록할 해외 게시글 정보",
                    required = true,
                    content = @Content(schema = @Schema(implementation = ForeignPostRequest.class))
            )
            @org.springframework.web.bind.annotation.RequestBody ForeignPostRequest request) {
        foreignPostService.create(
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

    @Operation(summary = "전체 해외 게시글 조회", description = "모든 해외 게시글을 최신순으로 조회합니다.")
    @GetMapping
    public ResponseEntity<List<ForeignPostResponse>> getAllPosts() {
        List<ForeignPost> posts = foreignPostRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        List<ForeignPostResponse> response = posts.stream()
                .map(ForeignPostResponse::from)
                .toList();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "해외 게시글 상세 조회", description = "postId로 해외 게시글 상세 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "404", description = "게시글 없음", content = @Content)
    })
    @GetMapping("/{postId}")
    public ResponseEntity<ForeignPostResponse> getPostById(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId) {
        ForeignPost post = foreignPostRepository.findById(postId).orElseThrow();
        return ResponseEntity.ok(ForeignPostResponse.from(post));
    }

    @Operation(summary = "내 해외 게시글 조회", description = "userId로 본인의 해외 게시글만 조회합니다.")
    @GetMapping("/my")
    public ResponseEntity<List<ForeignPostResponse>> getMyPosts(
            @Parameter(description = "사용자 ID", example = "1")
            @RequestParam Long userId) {
        List<ForeignPost> posts = foreignPostRepository.findByUserId(userId);
        List<ForeignPostResponse> response = posts.stream()
                .map(ForeignPostResponse::from)
                .toList();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "해외 게시글 수정", description = "기존 게시글을 수정합니다.")
    @PatchMapping("/{postId}")
    public ResponseEntity<String> updatePost(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId,
            @org.springframework.web.bind.annotation.RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "수정할 게시글 정보",
                    required = true,
                    content = @Content(schema = @Schema(implementation = DomesticPostRequest.class))
            )
            ForeignPostRequest request) {

        ForeignPost post = foreignPostRepository.findById(postId).orElseThrow();
        post.update(
                request.getTitle(),
                request.getContent(),
                request.getImg(),
                request.getUrl(),
                request.getPlatform(),
                request.getYourPrice()
        );
        foreignPostRepository.save(post);
        return ResponseEntity.ok("게시글이 수정되었습니다.");
    }

    @Operation(summary = "해외 게시글 삭제", description = "게시글 ID로 게시글을 삭제합니다.")
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId) {

        if (!foreignPostRepository.existsById(postId)) {
            return ResponseEntity.notFound().build();
        }

        foreignPostRepository.deleteById(postId);
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }
}
