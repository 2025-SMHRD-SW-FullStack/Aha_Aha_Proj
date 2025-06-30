package com.globalgo.globalgo.slidebot;

import com.globalgo.globalgo.slidebot.dto.Slide;
import com.globalgo.globalgo.slidebot.dto.SlidebotRequest;
import com.globalgo.globalgo.slidebot.dto.SlidebotResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class SlidebotService {

    private final SlideLoader slideLoader;
    private final WebClient openAIWebClient;
    private final SlidebotLogRepository slidebotLogRepository;

    private final Map<String, Integer> userSlideMap = new ConcurrentHashMap<>();
    private List<Slide> slides;

    @PostConstruct
    public void initSlides() {
        this.slides = slideLoader.loadSlides();
    }

    public SlidebotResponse startSlides(String userId) {
        userSlideMap.put(userId, 0);
        Slide first = slides.get(0);
        String message = formatSlideMessage(first, "📖 슬라이드를 시작합니다!");
        return new SlidebotResponse(message, LocalDateTime.now());
    }

    public SlidebotResponse handleInteraction(SlidebotRequest request) {
        String reply = handleInteraction(request.getUserId(), request.getMessage());
        return new SlidebotResponse(reply, LocalDateTime.now());
    }

    public String handleInteraction(String userId, String input) {
        int currentPage = userSlideMap.getOrDefault(userId, 0);

        if (currentPage >= slides.size()) {
            return completeSlides(userId, input);
        }

        Slide slide = slides.get(currentPage);

        if (isNextCommand(input)) {
            currentPage++;
            userSlideMap.put(userId, currentPage);

            if (currentPage >= slides.size()) {
                return completeSlides(userId, input);
            }

            Slide next = slides.get(currentPage);
            String reply = formatSlideMessage(next, "➡️ 다음 슬라이드로 이동했습니다!");
            saveLog(userId, input, reply);
            return reply;
        }

        String prompt = buildPrompt(slide, input);
        String reply = callChatGPT(prompt);
        saveLog(userId, input, reply);
        return reply;
    }

    private String completeSlides(String userId, String input) {
        String message = "🎉 모든 슬라이드를 완료했습니다!";
        saveLog(userId, input, message);
        return message;
    }

    private String formatSlideMessage(Slide slide, String prefix) {
        return String.format("""
                %s
                제목: %s
                내용: %s
                이미지: %s

                궁금한 점을 물어보거나 '다음'이라고 입력해주세요.
                """, prefix, slide.title(), slide.content(), slide.image());
    }

    private boolean isNextCommand(String input) {
        String lower = input.trim().toLowerCase();
        return lower.equals("다음") || lower.equals("next") || lower.equals("넘겨") || lower.equals("ok") || lower.equals("ㅇㅋ");
    }

    private String buildPrompt(Slide slide, String userInput) {
        return String.format("""
                너는 사용자가 아마존 입점 가이드를 이해할 수 있도록 도와주는 챗봇이야.
                아래는 현재 슬라이드 내용이야:

                제목: %s
                내용: %s

                사용자의 질문: "%s"

                이 내용을 바탕으로 친절하게 설명해줘.
                마지막에 "이해되면 '다음'이라고 말해주세요"라는 문장도 꼭 포함해줘.
                """, slide.title(), slide.content(), userInput);
    }

    private String callChatGPT(String prompt) {
        try {
            Map<String, Object> response = openAIWebClient.post()
                    .uri("/chat/completions")
                    .bodyValue(Map.of(
                            "model", "gpt-4",
                            "messages", List.of(Map.of(
                                    "role", "user",
                                    "content", prompt
                            ))
                    ))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("choices")) {
                return "GPT 응답을 이해할 수 없습니다. 다시 시도해주세요.";
            }

            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (choices.isEmpty()) return "GPT 응답이 비어 있습니다.";

            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return message != null ? (String) message.get("content") : "GPT 응답이 없습니다.";

        } catch (Exception e) {
            e.printStackTrace();
            return "GPT 응답 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
    }

    public void saveLog(String userId, String input, String reply) {
        SlidebotLog log = SlidebotLog.builder()
                .userId(userId)
                .userInput(input)
                .gptResponse(reply)
                .createdAt(LocalDateTime.now())
                .build();
        slidebotLogRepository.save(log);
    }
}

