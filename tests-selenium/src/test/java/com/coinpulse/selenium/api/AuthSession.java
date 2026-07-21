package com.coinpulse.selenium.api;

/**
 * The /api/auth/login response body - the shape the frontend persists in
 * web storage under the coinpulse.auth key.
 */
public record AuthSession(String token, String username, String role) {

    public String toJson() {
        return "{\"token\":\"%s\",\"username\":\"%s\",\"role\":\"%s\"}"
                .formatted(token, username, role);
    }
}
