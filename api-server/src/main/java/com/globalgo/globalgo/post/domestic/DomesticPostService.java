package com.globalgo.globalgo.post.domestic;

import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DomesticPostService {
    private final DomesticPostRepository domesticPostRepository;
    private final UserRepository userRepository;

    public void create(Long userId, String title, String content) {
        User user = userRepository.findById(userId).orElseThrow();
        DomesticPost post = DomesticPost.create(user, title, content);
        domesticPostRepository.save(post);
    }
}
