package com.globalgo.globalgo.auth.oauth2;

import com.globalgo.globalgo.auth.AuthProvider;
import com.globalgo.globalgo.user.Role;
import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserRepository;
import com.globalgo.globalgo.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Lazy
    @Autowired
    UserService userService;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // "google", "kakao", "naver"
        Map<String, Object> attributes = oauth2User.getAttributes();

        System.out.println("✅ [" + registrationId + "] OAuth2 attributes: " + attributes);

        String email = null;
        String nickname = null;
        String providerId = null;

        try {
            if ("google".equals(registrationId)) {
                email = (String) attributes.get("email");
                nickname = (String) attributes.get("name");
                providerId = (String) attributes.get("sub");

            } else if ("kakao".equals(registrationId)) {
                providerId = String.valueOf(attributes.get("id"));
                Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

                email = (String) kakaoAccount.get("email");
                nickname = profile != null ? (String) profile.get("nickname") : null;

                if (email == null || nickname == null) {
                    throw new OAuth2AuthenticationException("카카오에서 필수 정보를 받지 못했습니다.");
                }

            } else if ("naver".equals(registrationId)) {
                Map<String, Object> response = (Map<String, Object>) attributes.get("response");

                if (response == null) {
                    throw new OAuth2AuthenticationException("네이버 응답에서 response 필드 누락");
                }
                System.out.println("✅ Naver response: " + response);

                providerId = String.valueOf(response.get("id"));
                email = (String) response.get("email");
                nickname = (String) response.get("name");

                if (email == null) {
                    email = "naver_" + providerId + "@social.globalgo";
                }
                if (nickname == null) {
                    nickname = "naver_user_" + providerId;
                }

            } else {
                throw new IllegalArgumentException("지원하지 않는 OAuth Provider: " + registrationId);
            }

            final String finalEmail = email;
            final String finalNickname = nickname;
            final String finalProviderId = providerId;
            final String finalRegistrationId = registrationId.toUpperCase();

            if (userService.existsByProviderAndProviderId(AuthProvider.valueOf(finalRegistrationId), finalProviderId)) {
                throw new OAuth2AuthenticationException("이미 가입된 소셜 계정입니다.");
            }

            // ✅ DB에서 찾거나 새로 저장
            User user = userRepository.findByEmail(finalEmail).orElseGet(() ->
                    userRepository.save(
                            User.builder()
                                    .email(finalEmail)
                                    .nickname(finalNickname)
                                    .password(UUID.randomUUID().toString())
                                    .provider(AuthProvider.valueOf(finalRegistrationId))
                                    .providerId(finalProviderId)
                                    .role(Role.USER)
                                    .enabled(true)
                                    .build()
                    )
            );

            // ✅ "email" 포함된 새 attributes Map 생성
            Map<String, Object> customAttributes = Map.of(
                    "email", email,
                    "nickname", nickname,
                    "provider", registrationId
            );

            return new DefaultOAuth2User(
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                    customAttributes,
                    "email"
            );

        } catch (Exception e) {
            System.out.println("❌ OAuth2UserService 예외 발생: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

}
