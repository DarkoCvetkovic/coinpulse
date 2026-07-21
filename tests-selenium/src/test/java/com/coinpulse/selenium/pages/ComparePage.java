package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Compare page object; selectors mirror the Cypress compare page object.
 */
public class ComparePage extends BasePage {

    private static final By PAGE = byTestId("compare-page");
    private static final By WATCHLIST = byTestId("compare-watchlist");
    private static final By WATCHLIST_CARD = byTestId("compare-watchlist-card");
    private static final By ZONE_CARD = byTestId("compare-zone-card");
    private static final By DROP_AREA = byTestId("compare-zone");

    public ComparePage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        openPath(Routes.COMPARE);
        awaitVisible(PAGE);
        awaitVisible(WATCHLIST);
    }

    public void verifyShellReady() {
        awaitVisible(WATCHLIST_CARD);
        awaitVisible(ZONE_CARD);
        awaitVisible(DROP_AREA);
    }
}
