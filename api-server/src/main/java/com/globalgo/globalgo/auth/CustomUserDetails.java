package com.globalgo.globalgo.auth;

import com.globalgo.globalgo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final User user;

    @Override
    public String getUsername() {
        return user.getEmail();  // 로그인 ID
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 권한 미사용이면 빈 리스트 반환
        return Collections.emptyList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // 계정 만료 X
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // 잠금 X
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // 비밀번호 만료 X
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();  // 여기! 인증 여부 반영
    }

    public User getUser() {
        return user;
    }
}
