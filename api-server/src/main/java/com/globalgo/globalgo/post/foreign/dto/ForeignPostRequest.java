package com.globalgo.globalgo.post.foreign.dto;

import com.globalgo.globalgo.post.foreign.ForeignPost;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ForeignPostRequest {
    private Long userId;
    private String title;
    private String content;
    private String img;
    private String url;
    private String platform;
    private String yourPrice;
}
