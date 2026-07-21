package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Coin form page object; selectors mirror the Cypress coin-form page object.
 */
public class CoinFormPage extends BasePage {

    private static final By PAGE = byTestId("coin-form-page");
    private static final By NAME = byTestId("coin-name");
    private static final By SYMBOL = byTestId("coin-symbol");
    private static final By SUBMIT = byTestId("coin-form-submit");

    public CoinFormPage(WebDriver driver) {
        super(driver);
    }

    public void openNew() {
        openPath(Routes.COIN_NEW);
        awaitVisible(PAGE);
    }

    public void verifyShellReady() {
        awaitVisible(NAME);
        awaitVisible(SYMBOL);
        awaitVisible(SUBMIT);
    }
}
