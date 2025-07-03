package com.globalgo.globalgo.chatbot;

import com.globalgo.globalgo.chatbot.dto.PostTranslationRequest;
import com.globalgo.globalgo.post.domestic.DomesticPostService;
import com.globalgo.globalgo.post.foreign.ForeignPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/step5")
public class ChatbotPostController {

    private final DomesticPostService domesticPostService;
    private final ForeignPostService foreignPostService;

    @PostMapping("/post")
    public ResponseEntity<String> postTranslated(@RequestBody PostTranslationRequest request) {
        Long userId = request.getUserId();

        if (request.getTarget().contains("domestic")) {
            domesticPostService.create(userId, request.getTitle(), request.getContent());
        }

        if (request.getTarget().contains("foreign")) {
            foreignPostService.create(userId, request.getTranslatedTitle(), request.getTranslatedContent());
        }

        return ResponseEntity.ok("게시 성공");
    }
}
