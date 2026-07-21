package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Dynamic elements page object; selectors mirror the Cypress page object.
 */
public class DynamicPage extends BasePage {

    private static final By PAGE = byTestId("dynamic-page");
    private static final By TICKER_CARD = byTestId("ticker-card");
    private static final By DELAYED_BUTTON = byTestId("delayed-button");
    private static final By LAZY_LIST = byTestId("lazy-list");

    public DynamicPage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        openPath(Routes.DYNAMIC);
        awaitVisible(PAGE);
    }

    public void verifyShellReady() {
        awaitVisible(TICKER_CARD);
        awaitVisible(DELAYED_BUTTON);
        awaitVisible(LAZY_LIST);
    }
}
