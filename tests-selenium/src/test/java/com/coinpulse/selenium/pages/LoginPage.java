package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Login page object; selectors mirror the Cypress login page object.
 */
public class LoginPage extends BasePage {

    private static final By FORM = byTestId("login-form");
    private static final By USERNAME = byTestId("login-username");
    private static final By PASSWORD = byTestId("login-password");
    private static final By SUBMIT = byTestId("login-submit");
    private static final By SERVER_ERROR = byTestId("login-error");
    private static final By USERNAME_ERROR = byTestId("login-username-error");
    private static final By PASSWORD_ERROR = byTestId("login-password-error");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        openPath(Routes.LOGIN);
        awaitVisible(FORM);
    }

    public void awaitLoaded() {
        awaitVisible(FORM);
    }

    public void verifyShellReady() {
        awaitVisible(USERNAME);
        awaitVisible(PASSWORD);
        awaitEnabled(SUBMIT);
    }

    public void loginAs(String username, String password) {
        type(USERNAME, username);
        type(PASSWORD, password);
        click(SUBMIT);
    }

    public void typeUsername(String value) {
        type(USERNAME, value);
    }

    public void typePassword(String value) {
        type(PASSWORD, value);
    }

    public void submit() {
        click(SUBMIT);
    }

    public void verifyServerError(String message) {
        awaitVisible(SERVER_ERROR);
        awaitTextContains(SERVER_ERROR, message);
    }

    public void verifyFieldErrors() {
        awaitVisible(USERNAME_ERROR);
        awaitVisible(PASSWORD_ERROR);
    }

    public void verifyUsernameError(String message) {
        awaitVisible(USERNAME_ERROR);
        awaitTextContains(USERNAME_ERROR, message);
    }

    public void verifyPasswordError(String message) {
        awaitVisible(PASSWORD_ERROR);
        awaitTextContains(PASSWORD_ERROR, message);
    }

    public void verifyNoUsernameError() {
        awaitAbsent(USERNAME_ERROR);
    }
}
