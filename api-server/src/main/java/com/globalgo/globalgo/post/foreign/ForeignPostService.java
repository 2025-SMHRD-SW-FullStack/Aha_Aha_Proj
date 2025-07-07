package com.globalgo.globalgo.post.foreign;

import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ForeignPostService {
    private final ForeignPostRepository foreignPostRepository;
    private final UserRepository userRepository;

    
    // 챗봇용
    @Transactional
    public void create(Long userId, String platform, String title, String content) {
        System.out.println("🔥🔥🔥 [Foreign] 저장 시도 - userId: " + userId + ", title: " + title);
        User user = userRepository.findById(userId).orElseThrow();
        ForeignPost post = ForeignPost.create(user, platform, title, content);
        System.out.println("✅ [Foreign] 저장 시도");
        foreignPostRepository.save(post);
        System.out.println("✅ [Foreign] 저장 완료");

    }

    // 페이지용
    @Transactional
    public void create(Long userId, String title, String content,
                       String img, String url, String platform, String yourPrice) {
        System.out.println("🔥🔥🔥 [Foreign] 페이지용 저장 시도 - userId: " + userId + ", title: " + title);
        User user = userRepository.findById(userId).orElseThrow();
        ForeignPost post = ForeignPost.create(user, title, content, img, url, platform, yourPrice);
        System.out.println("✅ [Foreign] 페이지용 저장 시도");
        foreignPostRepository.save(post);
        System.out.println("✅ [Foreign] 페이지용 저장 완료");
    }

}
