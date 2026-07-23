package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Coin form page object; selectors mirror the Cypress coin-form page object.
 */
public class CoinFormPage extends BasePage {

    private static final By PAGE = byTestId("coin-form-page");
    private static final By NAME = byTestId("coin-name");
    private static final By SYMBOL = byTestId("coin-symbol");
    private static final By PRICE = byTestId("coin-price");
    private static final By CATEGORY = byTestId("coin-category");
    private static final By SUBMIT = byTestId("coin-form-submit");
    private static final By NAME_ERROR = byTestId("coin-name-error");
    private static final By SYMBOL_ERROR = byTestId("coin-symbol-error");
    private static final By PRICE_ERROR = byTestId("coin-price-error");
    private static final By CATEGORY_ERROR = byTestId("coin-category-error");

    private static final String VALID_PRICE = "100";
    private static final String VALID_CATEGORY = "L1";

    public CoinFormPage(WebDriver driver) {
        super(driver);
    }

    public void openNew() {
        openPath(Routes.COIN_NEW);
        awaitVisible(PAGE);
    }

    public void openEdit(long id) {
        openPath(Routes.coinEdit(id));
        awaitVisible(PAGE);
    }

    public void verifyShellReady() {
        awaitVisible(NAME);
        awaitVisible(SYMBOL);
        awaitVisible(SUBMIT);
    }

    public void fillValid(String name, String symbol) {
        type(NAME, name);
        type(SYMBOL, symbol);
        type(PRICE, VALID_PRICE);
        selectByValue(CATEGORY, VALID_CATEGORY);
    }

    public void submit() {
        click(SUBMIT);
    }

    public void verifyRequiredErrors() {
        awaitVisible(NAME_ERROR);
        awaitVisible(SYMBOL_ERROR);
        awaitVisible(PRICE_ERROR);
        awaitVisible(CATEGORY_ERROR);
    }

    public void verifyNameValue(String name) {
        wait.until(ExpectedConditions.attributeToBe(NAME, "value", name));
    }
}
