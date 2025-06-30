package com.globalgo.globalgo.slidebot;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalgo.globalgo.slidebot.dto.Slide;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SlideLoader {
    private final ObjectMapper objectMapper;

    public List<Slide> loadSlides() {
        try {
            return objectMapper.readValue(
                    new ClassPathResource("slides.json").getInputStream(),
                    new TypeReference<List<Slide>>() {}
            );
        } catch (IOException e) {
            throw new RuntimeException("슬라이드 JSON 로딩 실패", e);
        }
    }
}