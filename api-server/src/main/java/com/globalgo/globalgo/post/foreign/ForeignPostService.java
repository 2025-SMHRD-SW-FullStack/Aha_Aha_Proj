package com.globalgo.globalgo.post.foreign;

import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForeignPostService {
    private final ForeignPostRepository foreignPostRepository;
    private final UserRepository userRepository;

    public void create(Long userId, String title, String content) {
        User user = userRepository.findById(userId).orElseThrow();
        ForeignPost post = ForeignPost.create(user, title, content);
        foreignPostRepository.save(post);
    }
}
