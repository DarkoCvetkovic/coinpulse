package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.TradePage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * Trade keywords: specs call these, never the page object directly.
 */
public class TradeKeywords {

    private final TradePage tradePage;

    public TradeKeywords(WebDriver driver) {
        this.tradePage = new TradePage(driver);
    }

    public void actionOpenTrade() {
        Allure.step("Open the trade page", tradePage::open);
    }

    public void actionRecordTrade(String type, String amount) {
        Allure.step("Record a " + type + " trade for amount: " + amount, () -> {
            tradePage.selectFirstCoin();
            tradePage.selectType(type);
            tradePage.enterAmount(amount);
            tradePage.confirm();
            tradePage.submit();
        });
    }

    public void actionRecordTradeForCoin(long coinId, String type, String amount) {
        Allure.step("Record a " + type + " trade of " + amount + " for coin id: " + coinId,
                () -> {
                    tradePage.selectCoin(coinId);
                    tradePage.selectType(type);
                    tradePage.enterAmount(amount);
                    tradePage.confirm();
                    tradePage.submit();
                });
    }

    public void actionSubmitEmptyTrade() {
        Allure.step("Submit the trade form with no input to trigger validation",
                tradePage::submit);
    }

    public void checkTradeShellReady() {
        Allure.step("Verify the trade form renders and is interactive",
                tradePage::verifyShellReady);
    }

    public void checkTradeValidationErrors() {
        Allure.step("Verify required-field validation messages on the trade form",
                tradePage::verifyRequiredErrors);
    }

    public void checkTradeSuccess(String text) {
        Allure.step("Verify the trade success message contains: " + text,
                () -> tradePage.verifySuccess(text));
    }
}
