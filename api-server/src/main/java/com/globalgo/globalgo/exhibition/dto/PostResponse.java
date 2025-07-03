package com.globalgo.globalgo.exhibition.dto;

import com.globalgo.globalgo.post.domestic.DomesticPost;
import com.globalgo.globalgo.post.foreign.ForeignPost;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String createdAt;

    public static PostResponse from(DomesticPost post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCreatedAt().toString()
        );
    }

    public static PostResponse from(ForeignPost post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCreatedAt().toString()
        );
    }
}
