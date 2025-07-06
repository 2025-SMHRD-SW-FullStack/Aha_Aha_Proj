package com.globalgo.globalgo.post.foreign.dto;

import com.globalgo.globalgo.post.foreign.ForeignPost;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ForeignPostResponse {
    private Long id;
    private String title;
    private String content;
    private String img;
    private String url;
    private String platform;
    private String yourPrice;
    private String username;
    private LocalDateTime createdAt;

    public static ForeignPostResponse from(ForeignPost post) {
        return new ForeignPostResponse(
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
