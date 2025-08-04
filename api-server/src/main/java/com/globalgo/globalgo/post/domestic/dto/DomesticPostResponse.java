package com.globalgo.globalgo.post.domestic.dto;

import com.globalgo.globalgo.post.domestic.DomesticPost;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class DomesticPostResponse {
    private Long id;
    private String title;
    private String content;
    private String img;
    private String url;
    private String platform;
    private String yourPrice;
    private String username;
    private LocalDateTime createdAt;

    public static DomesticPostResponse from(DomesticPost post) {
        return new DomesticPostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getImg(),
                post.getUrl(),
                post.getPlatform(),
                post.getYourPrice(),
                post.getUser().getNickname(),
                post.getCreatedAt()
        );
    }
}
