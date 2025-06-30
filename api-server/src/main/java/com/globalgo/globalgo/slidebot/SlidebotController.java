package com.globalgo.globalgo.slidebot;

import com.globalgo.globalgo.slidebot.dto.SlidebotRequest;
import com.globalgo.globalgo.slidebot.dto.SlidebotResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/slidebot")
@RequiredArgsConstructor
@Tag(name = "챗봇 API", description = "슬라이드 UI 및 질문,답")
public class SlidebotController {

    private final SlidebotService slidebotService;

    @Operation(
            summary = "슬라이드 챗봇 시작",
            description = "사용자 ID를 받아 챗봇 기반 PDF 슬라이드 학습을 시작합니다. 슬라이드 1번부터 시작되며, 슬라이드 제목/내용/이미지가 함께 반환됩니다.",
            parameters = {
                    @Parameter(name = "userId", description = "사용자 식별자 (예: UUID, 이메일 등)", required = true)
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "슬라이드 시작 메시지 반환",
                            content = @Content(schema = @Schema(implementation = SlidebotResponse.class)))
            }
    )
    @PostMapping("/start")
    public ResponseEntity<SlidebotResponse> startSlides(@RequestParam String userId) {
        SlidebotResponse response = slidebotService.startSlides(userId);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "슬라이드 챗봇 대화 처리",
            description = """
            사용자의 질문 또는 '다음' 명령을 처리합니다.  
            - 질문을 입력하면 GPT가 현재 슬라이드 내용에 대해 설명합니다.  
            - '다음'을 입력하면 다음 슬라이드로 넘어갑니다.  
            모든 대화 내용은 DB에 로그로 저장됩니다.
            """,
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "사용자 메시지 입력",
                    required = true,
                    content = @Content(schema = @Schema(implementation = SlidebotRequest.class))
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "GPT 응답 or 다음 슬라이드 메시지 반환",
                            content = @Content(schema = @Schema(implementation = SlidebotResponse.class)))
            }
    )
    @PostMapping("/chat")
    public ResponseEntity<SlidebotResponse> handleChat(@RequestBody SlidebotRequest request) {
        String userId = request.getUserId();
        String message = request.getMessage();

        String reply = slidebotService.handleInteraction(userId, message);
        slidebotService.saveLog(userId, message, reply);

        return ResponseEntity.ok(new SlidebotResponse(reply, LocalDateTime.now()));
    }
}
