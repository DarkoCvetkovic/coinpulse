package com.coinpulse.selenium.constants;

import com.coinpulse.selenium.core.Config;

/**
 * Seed user credentials sourced from configuration - never hardcoded.
 */
public final class Users {

    public record Credentials(String username, String password) {
    }

    private Users() {
    }

    public static Credentials standard() {
        return new Credentials(Config.require("STANDARD_USERNAME"), Config.require("STANDARD_PASSWORD"));
    }

    public static Credentials locked() {
        return new Credentials(Config.require("LOCKED_USERNAME"), Config.require("LOCKED_PASSWORD"));
    }

    public static Credentials admin() {
        return new Credentials(Config.require("ADMIN_USERNAME"), Config.require("ADMIN_PASSWORD"));
    }
}
