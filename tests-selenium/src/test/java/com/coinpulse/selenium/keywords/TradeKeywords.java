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

    public void checkTradeShellReady() {
        Allure.step("Verify the trade form renders and is interactive",
                tradePage::verifyShellReady);
    }
}
