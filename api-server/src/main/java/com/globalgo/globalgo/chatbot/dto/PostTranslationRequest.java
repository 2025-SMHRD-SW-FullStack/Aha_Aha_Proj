package com.globalgo.globalgo.chatbot.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PostTranslationRequest {
    private Long userId;
    private String platform;
    private String title;
    private String content;
    private String translatedTitle;
    private String translatedContent;
    private String target; // "domestic", "foreign", "both"
}

