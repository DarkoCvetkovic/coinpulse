package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.MarketsPage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * Markets keywords: specs call these, never the page object directly.
 */
public class MarketsKeywords {

    private final MarketsPage marketsPage;

    public MarketsKeywords(WebDriver driver) {
        this.marketsPage = new MarketsPage(driver);
    }

    public void actionOpenMarkets() {
        Allure.step("Open the markets page", marketsPage::open);
    }

    public void checkMarketsShellReady() {
        Allure.step("Verify the markets table, search and filters render",
                marketsPage::verifyShellReady);
    }
}
