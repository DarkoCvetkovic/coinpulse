package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

/**
 * Trade page object; selectors mirror the Cypress trade page object.
 */
public class TradePage extends BasePage {

    private static final By PAGE = byTestId("trade-page");
    private static final By FORM = byTestId("trade-form");
    private static final By MARKET_PRICE = byTestId("trade-market-price");
    private static final By SUCCESS = byTestId("trade-success");
    private static final By COIN = byTestId("trade-coin");
    private static final By TYPE_BUY = byTestId("trade-type-buy");
    private static final By TYPE_SELL = byTestId("trade-type-sell");
    private static final By AMOUNT = byTestId("trade-amount");
    private static final By CONFIRM = byTestId("trade-confirm");
    private static final By SUBMIT = byTestId("trade-submit");
    private static final By COIN_ERROR = byTestId("trade-coin-error");
    private static final By AMOUNT_ERROR = byTestId("trade-amount-error");
    private static final By PRICE_ERROR = byTestId("trade-price-error");
    private static final By CONFIRM_ERROR = byTestId("trade-confirm-error");

    private static final String BUY_TYPE = "buy";

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

    public void selectFirstCoin() {
        Select coinSelect = new Select(awaitVisible(COIN));
        wait.until(d -> coinSelect.getOptions().size() > 1);
        coinSelect.selectByIndex(1);
        awaitVisible(MARKET_PRICE);
    }

    public void selectCoin(long coinId) {
        Select coinSelect = new Select(awaitVisible(COIN));
        wait.until(d -> coinSelect.getOptions().size() > 1);
        coinSelect.selectByValue(String.valueOf(coinId));
        awaitVisible(MARKET_PRICE);
    }

    public void selectType(String type) {
        click(BUY_TYPE.equals(type) ? TYPE_BUY : TYPE_SELL);
    }

    public void enterAmount(String amount) {
        type(AMOUNT, amount);
    }

    public void confirm() {
        click(CONFIRM);
    }

    public void submit() {
        click(SUBMIT);
    }

    public void verifyRequiredErrors() {
        awaitVisible(COIN_ERROR);
        awaitVisible(AMOUNT_ERROR);
        awaitVisible(PRICE_ERROR);
        awaitVisible(CONFIRM_ERROR);
    }

    public void verifySuccess(String text) {
        awaitVisible(SUCCESS);
        awaitTextContains(SUCCESS, text);
    }
}
