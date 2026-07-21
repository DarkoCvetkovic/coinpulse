package com.coinpulse.selenium.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Dashboard page object; selectors mirror the Cypress dashboard page object.
 */
public class DashboardPage extends BasePage {

    private static final By PAGE = byTestId("dashboard-page");

    public DashboardPage(WebDriver driver) {
        super(driver);
    }

    public DashboardPage awaitLoaded() {
        awaitVisible(PAGE);
        return this;
    }

    public boolean isLoaded() {
        return awaitVisible(PAGE).isDisplayed();
    }
}
