package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Markets page object; selectors mirror the Cypress markets page object.
 */
public class MarketsPage extends BasePage {

    private static final By PAGE = byTestId("markets-page");
    private static final By TABLE = byTestId("markets-table");
    private static final By SEARCH = byTestId("markets-search");
    private static final By FILTER_CATEGORY = byTestId("markets-filter-category");

    public MarketsPage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        openPath(Routes.MARKETS);
        awaitVisible(PAGE);
        awaitVisible(TABLE);
    }

    public void verifyShellReady() {
        awaitVisible(TABLE);
        awaitVisible(SEARCH);
        awaitVisible(FILTER_CATEGORY);
    }
}
