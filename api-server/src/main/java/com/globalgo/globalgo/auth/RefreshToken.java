package com.globalgo.globalgo.auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    private String email;

    private String token;

    private LocalDateTime expiresAt; // 만료 시간

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }

}
