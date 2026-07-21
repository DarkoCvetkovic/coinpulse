package com.coinpulse.selenium.core;

import com.coinpulse.selenium.api.ApiClient;
import com.coinpulse.selenium.constants.Users;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.openqa.selenium.WebDriver;

/**
 * Base for all UI tests: resets the backend seed, opens a fresh browser per
 * test and captures an Allure screenshot when a test fails.
 */
public abstract class BaseTest {

    protected WebDriver driver;

    @RegisterExtension
    final ScreenshotOnFailure screenshotOnFailure = new ScreenshotOnFailure(() -> driver);

    @BeforeEach
    void startDriver() {
        ApiClient.resetBackend();
        driver = DriverFactory.create();
    }

    protected void loginViaApi(Users.Credentials credentials) {
        Session.inject(driver,
                ApiClient.loginSession(credentials.username(), credentials.password()));
    }

    @AfterEach
    void quitDriver() {
        if (driver != null) {
            driver.quit();
        }
    }
}
