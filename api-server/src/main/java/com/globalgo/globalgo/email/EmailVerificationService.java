package com.globalgo.globalgo.email;

import com.globalgo.globalgo.exception.EmailTokenException;
import com.globalgo.globalgo.exception.UserAlreadyVerifiedException;
import com.globalgo.globalgo.exception.UserNotFoundException;
import com.globalgo.globalgo.user.User;
import com.globalgo.globalgo.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final EmailVerificationTokenRepository tokenRepo;
    private final UserRepository userRepo;

    @Transactional
    public void verifyToken(String token) {
        EmailVerificationToken emailToken = tokenRepo.findByToken(token)
                .orElseThrow(() -> new EmailTokenException("유효하지 않은 인증 토큰입니다."));

        if (emailToken.isExpired()) {
            throw new EmailTokenException("이메일 인증 토큰이 만료되었습니다.");
        }

        if (emailToken.isVerified()) {
            throw new UserAlreadyVerifiedException("이미 인증이 완료된 이메일입니다.");
        }

        emailToken.markAsVerified();
        tokenRepo.save(emailToken);

        // 🔒 회원가입 후에만 삭제 가능
        // tokenRepo.delete(emailToken);
    }

    @Transactional
    public EmailVerificationToken createVerificationToken(String email) {
        // 기존 토큰 존재 시 삭제 (중복 방지)
        tokenRepo.findAll().stream()
                .filter(token -> token.getEmail().equals(email))
                .forEach(tokenRepo::delete);

        EmailVerificationToken newToken = EmailVerificationToken.create(email);
        return tokenRepo.save(newToken);
    }
}
