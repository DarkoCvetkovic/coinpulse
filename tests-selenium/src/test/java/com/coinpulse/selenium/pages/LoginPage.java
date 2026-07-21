package com.coinpulse.selenium.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Login page object; selectors mirror the Cypress login page object.
 */
public class LoginPage extends BasePage {

    private static final String PATH = "/login";
    private static final By FORM = byTestId("login-form");
    private static final By USERNAME = byTestId("login-username");
    private static final By PASSWORD = byTestId("login-password");
    private static final By SUBMIT = byTestId("login-submit");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public LoginPage open() {
        openPath(PATH);
        awaitVisible(FORM);
        return this;
    }

    public boolean isUsernameVisible() {
        return isVisible(USERNAME);
    }

    public boolean isPasswordVisible() {
        return isVisible(PASSWORD);
    }

    public boolean isSubmitEnabled() {
        return awaitVisible(SUBMIT).isEnabled();
    }

    public void loginAs(String username, String password) {
        type(USERNAME, username);
        type(PASSWORD, password);
        click(SUBMIT);
    }
}
