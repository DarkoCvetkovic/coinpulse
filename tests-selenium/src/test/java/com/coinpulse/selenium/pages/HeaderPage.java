package com.coinpulse.selenium.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * App header page object; selectors mirror the Cypress header page object.
 */
public class HeaderPage extends BasePage {

    private static final By HEADER = byTestId("app-header");
    private static final By LOGOUT_BUTTON = byTestId("logout-button");

    public HeaderPage(WebDriver driver) {
        super(driver);
    }

    public void logout() {
        awaitVisible(HEADER);
        click(LOGOUT_BUTTON);
    }
}
