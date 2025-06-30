package com.globalgo.globalgo.slidebot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SlidebotResponse {
    private String response;
    private LocalDateTime timestamp;
}
