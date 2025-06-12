package com.globalgo.globalgo.auth.oauth2;

import com.globalgo.globalgo.auth.AuthProvider;
import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // "google"
        Map<String, Object> attributes = oauth2User.getAttributes();

        OAuth2UserInfo userInfo;
        if ("google".equals(registrationId)) {
            userInfo = new GoogleUserInfo(attributes);
        } else {
            throw new IllegalArgumentException("지원하지 않는 OAuth Provider: " + registrationId);
        }

        // 이메일 기반 사용자 조회
        User user = userRepository.findByEmail(userInfo.getEmail())
                .orElseGet(() -> {
                    // 없는 경우 새로 등록
                    return userRepository.save(User.builder()
                            .email(userInfo.getEmail())
                            .nickname(userInfo.getName())
                            .password(UUID.randomUUID().toString())  // 진짜로 못 맞추는 랜덤값
                            .provider(AuthProvider.valueOf(registrationId.toUpperCase()))
                            .providerId(userInfo.getProviderId())
                            .role(com.globalgo.globalgo.user.Role.USER)
                            .enabled(true)  // OAuth 로그인은 별도 인증 없이 바로 활성화
                            .build());
                });

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                "email" // key name
        );
    }
}
