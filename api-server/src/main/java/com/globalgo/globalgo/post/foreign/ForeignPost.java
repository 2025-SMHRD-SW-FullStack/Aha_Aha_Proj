package com.globalgo.globalgo.post.foreign;

import com.globalgo.globalgo.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ForeignPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    @Lob
    private String content;

    @Column(nullable = true)
    private String url;

    @Column(nullable = true)
    private String platform;

    @Column(nullable = true)
    private String yourPrice;

    @Column(nullable = true)
    private String img;

    private LocalDateTime createdAt;

    // 챗봇용
    public static ForeignPost create(User user, String platform, String title, String content) {
        return ForeignPost.builder()
                .user(user)
                .platform(platform)
                .title(title)
                .content(content)
                .createdAt(LocalDateTime.now())
                .build();
    }

    // 페이지용
    public static ForeignPost create(User user, String title, String content,
                                     String img, String url, String platform, String yourPrice) {
        return ForeignPost.builder()
                .user(user)
                .title(title)
                .content(content)
                .img(img)
                .url(url)
                .platform(platform)
                .yourPrice(yourPrice)
                .createdAt(LocalDateTime.now())
                .build();
    }

}
