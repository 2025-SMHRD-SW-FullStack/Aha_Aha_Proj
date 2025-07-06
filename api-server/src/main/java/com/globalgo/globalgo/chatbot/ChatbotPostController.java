package com.globalgo.globalgo.chatbot;

import com.globalgo.globalgo.chatbot.dto.PostTranslationRequest;
import com.globalgo.globalgo.post.domestic.DomesticPostService;
import com.globalgo.globalgo.post.foreign.ForeignPostService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/step5")
@Tag(name = "챗봇전용 상품게시 API", description = "챗봇전용 상품 게시 API")
public class ChatbotPostController {

    private final DomesticPostService domesticPostService;
    private final ForeignPostService foreignPostService;

    @PostMapping("/post")
    public ResponseEntity<String> postTranslated(@RequestBody PostTranslationRequest request) {
        System.out.println("✅✅✅ ChatbotPostController 진입 확인");
        Long userId = request.getUserId();

        if (request.getTarget().contains("domestic") || request.getTarget().contains("both")) {
            domesticPostService.create(userId, request.getTitle(), request.getContent());
        }

        if (request.getTarget().contains("foreign") || request.getTarget().contains("both")) {
            foreignPostService.create(userId, request.getTranslatedTitle(), request.getTranslatedContent());
        }

        return ResponseEntity.ok("게시 성공");
    }
}
