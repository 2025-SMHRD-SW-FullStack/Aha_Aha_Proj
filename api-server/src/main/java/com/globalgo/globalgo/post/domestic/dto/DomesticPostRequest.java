package com.globalgo.globalgo.post.domestic.dto;

import lombok.Data;

@Data
public class DomesticPostRequest {
    private Long userId;
    private String title;
    private String content;
    private String img;
    private String url;
    private String platform;
    private String yourPrice;
}
