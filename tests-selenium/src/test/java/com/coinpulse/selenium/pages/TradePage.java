package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Trade page object; selectors mirror the Cypress trade page object.
 */
public class TradePage extends BasePage {

    private static final By PAGE = byTestId("trade-page");
    private static final By FORM = byTestId("trade-form");
    private static final By COIN = byTestId("trade-coin");
    private static final By AMOUNT = byTestId("trade-amount");
    private static final By SUBMIT = byTestId("trade-submit");

    public TradePage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        openPath(Routes.TRADE);
        awaitVisible(PAGE);
        awaitVisible(FORM);
    }

    public void verifyShellReady() {
        awaitVisible(COIN);
        awaitVisible(AMOUNT);
        awaitEnabled(SUBMIT);
    }
}
