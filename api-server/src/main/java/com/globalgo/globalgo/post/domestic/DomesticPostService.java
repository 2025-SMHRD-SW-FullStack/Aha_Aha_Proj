package com.globalgo.globalgo.post.domestic;

import com.globalgo.globalgo.post.foreign.ForeignPost;
import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DomesticPostService {
    private final DomesticPostRepository domesticPostRepository;
    private final UserRepository userRepository;

    // 챗봇용
    @Transactional
    public void create(Long userId, String title, String content) {
        System.out.println("🔥🔥🔥 [Domestic] 저장 시도 - userId: " + userId + ", title: " + title);
        User user = userRepository.findById(userId).orElseThrow();
        DomesticPost post = DomesticPost.create(user, title, content);
        System.out.println("🔥 [Domestic] 저장 시도");
        domesticPostRepository.save(post);
        System.out.println("✅ [Domestic] 저장 완료");
    }

    // 페이지용
    @Transactional
    public void create(Long userId, String title, String content,
                       String img, String url, String platform, String yourPrice) {
        System.out.println("🔥🔥🔥 [Foreign] 페이지용 저장 시도 - userId: " + userId + ", title: " + title);
        User user = userRepository.findById(userId).orElseThrow();
        DomesticPost post = DomesticPost.create(user, title, content, img, url, platform, yourPrice);
        System.out.println("✅ [Foreign] 페이지용 저장 시도");
        domesticPostRepository.save(post);
        System.out.println("✅ [Foreign] 페이지용 저장 완료");
    }
}
