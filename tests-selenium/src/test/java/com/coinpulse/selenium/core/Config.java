package com.coinpulse.selenium.core;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

/**
 * Resolves suite configuration with the precedence: JVM system property,
 * environment variable, .env file in the project root, built-in default.
 */
public final class Config {

    private static final Properties DOT_ENV = loadDotEnv();

    private Config() {
    }

    public static String baseUrl() {
        return get("COINPULSE_BASE_URL", "http://localhost:5173");
    }

    public static String apiUrl() {
        return get("COINPULSE_API_URL", "http://localhost:8080");
    }

    public static String browser() {
        return get("COINPULSE_BROWSER", "edge");
    }

    public static boolean headless() {
        return Boolean.parseBoolean(get("COINPULSE_HEADLESS", "true"));
    }

    public static String get(String key, String defaultValue) {
        String fromProperty = System.getProperty(key);
        if (fromProperty != null && !fromProperty.isBlank()) {
            return fromProperty;
        }
        String fromEnv = System.getenv(key);
        if (fromEnv != null && !fromEnv.isBlank()) {
            return fromEnv;
        }
        return DOT_ENV.getProperty(key, defaultValue);
    }

    public static String require(String key) {
        String value = get(key, null);
        if (value == null) {
            throw new IllegalStateException(
                    "Missing configuration key " + key + " - set it as an env var or in .env");
        }
        return value;
    }

    private static Properties loadDotEnv() {
        Properties properties = new Properties();
        Path dotEnv = Path.of(".env");
        if (Files.exists(dotEnv)) {
            try (var reader = Files.newBufferedReader(dotEnv)) {
                properties.load(reader);
            } catch (IOException e) {
                throw new IllegalStateException("Failed to read .env", e);
            }
        }
        return properties;
    }
}
