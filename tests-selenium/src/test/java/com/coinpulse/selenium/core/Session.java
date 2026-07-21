package com.coinpulse.selenium.core;

import com.coinpulse.selenium.api.AuthSession;
import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

/**
 * Seeds the frontend auth session the same way the Cypress login command and
 * the Playwright storage state do: log in over the API, then plant the
 * response in sessionStorage so pages start already signed in.
 */
public final class Session {

    private static final String STORAGE_KEY = "coinpulse.auth";

    private Session() {
    }

    public static void inject(WebDriver driver, AuthSession session) {
        driver.get(Config.baseUrl() + Routes.LOGIN);
        ((JavascriptExecutor) driver).executeScript(
                "window.sessionStorage.setItem(arguments[0], arguments[1])",
                STORAGE_KEY, session.toJson());
    }
}
