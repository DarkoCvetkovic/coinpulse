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

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        openPath(Routes.LOGIN);
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
}
