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

    private LocalDateTime createdAt;

    public static ForeignPost create(User user, String title, String content) {
        return ForeignPost.builder()
                .user(user)
                .title(title)
                .content(content)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
