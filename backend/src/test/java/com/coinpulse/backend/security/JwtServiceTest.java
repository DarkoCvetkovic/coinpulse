package com.coinpulse.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtServiceTest {

    private static final String SECRET = "unit-test-secret-key-that-is-long-enough-for-hmac-sha256";
    private static final String OTHER_SECRET = "another-secret-key-that-is-also-long-enough-for-hmac-sha";
    private static final long ONE_HOUR_MS = 3_600_000L;
    private static final String USERNAME = "standard_user";
    private static final String ROLE = "USER";

    private final JwtService jwtService = new JwtService(SECRET, ONE_HOUR_MS);

    @Test
    void generatedTokenCarriesSubjectAndRole() {
        String token = jwtService.generateToken(USERNAME, ROLE);

        Claims claims = jwtService.parseToken(token);

        assertThat(claims.getSubject()).isEqualTo(USERNAME);
        assertThat(claims.get("role", String.class)).isEqualTo(ROLE);
    }

    @Test
    void generatedTokenExpiresAfterConfiguredLifetime() {
        Date before = new Date();
        String token = jwtService.generateToken(USERNAME, ROLE);
        Date after = new Date();

        Claims claims = jwtService.parseToken(token);

        assertThat(claims.getExpiration())
                .isAfterOrEqualTo(new Date(truncateToSeconds(before) + ONE_HOUR_MS))
                .isBeforeOrEqualTo(new Date(after.getTime() + ONE_HOUR_MS));
        assertThat(claims.getIssuedAt()).isBeforeOrEqualTo(after);
    }

    @Test
    void parseRejectsTokenSignedWithDifferentKey() {
        String foreignToken = new JwtService(OTHER_SECRET, ONE_HOUR_MS).generateToken(USERNAME, ROLE);

        assertThatThrownBy(() -> jwtService.parseToken(foreignToken))
                .isInstanceOf(SignatureException.class);
    }

    @Test
    void parseRejectsExpiredToken() {
        String expiredToken = new JwtService(SECRET, -1000L).generateToken(USERNAME, ROLE);

        assertThatThrownBy(() -> jwtService.parseToken(expiredToken))
                .isInstanceOf(ExpiredJwtException.class);
    }

    @Test
    void parseRejectsMalformedToken() {
        String malformedToken = "not-a-jwt";

        assertThatThrownBy(() -> jwtService.parseToken(malformedToken))
                .isInstanceOf(MalformedJwtException.class);
    }

    @Test
    void parseRejectsTamperedToken() {
        String token = jwtService.generateToken(USERNAME, ROLE);
        String tamperedToken = token.substring(0, token.lastIndexOf('.') + 1) + "tampered-signature";

        assertThatThrownBy(() -> jwtService.parseToken(tamperedToken))
                .isInstanceOf(SignatureException.class);
    }

    private long truncateToSeconds(Date date) {
        return date.getTime() / 1000 * 1000;
    }
}
