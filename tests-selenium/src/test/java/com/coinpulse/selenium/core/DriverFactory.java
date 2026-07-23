package com.coinpulse.selenium.core;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.util.List;

/**
 * Creates WebDriver instances for the configured browser; Selenium Manager
 * downloads and caches the matching driver binary on first use.
 */
public final class DriverFactory {

    private static final List<String> CHROMIUM_ARGS = List.of("--window-size=1400,1000");
    private static final List<String> CHROMIUM_HEADLESS_ARGS =
            List.of("--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu");

    private DriverFactory() {
    }

    public static WebDriver create() {
        String browser = Config.browser();
        boolean headless = Config.headless();
        return switch (browser) {
            case "edge" -> {
                EdgeOptions options = new EdgeOptions();
                options.addArguments(CHROMIUM_ARGS);
                if (headless) {
                    options.addArguments(CHROMIUM_HEADLESS_ARGS);
                }
                yield new EdgeDriver(options);
            }
            case "chrome" -> {
                ChromeOptions options = new ChromeOptions();
                options.addArguments(CHROMIUM_ARGS);
                if (headless) {
                    options.addArguments(CHROMIUM_HEADLESS_ARGS);
                }
                yield new ChromeDriver(options);
            }
            case "firefox" -> {
                FirefoxOptions options = new FirefoxOptions();
                if (headless) {
                    options.addArguments("-headless");
                }
                yield new FirefoxDriver(options);
            }
            default -> throw new IllegalArgumentException("Unsupported browser: " + browser);
        };
    }
}
