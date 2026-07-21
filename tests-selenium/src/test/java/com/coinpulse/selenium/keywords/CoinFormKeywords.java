package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.CoinFormPage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * Coin form keywords: specs call these, never the page object directly.
 */
public class CoinFormKeywords {

    private final CoinFormPage coinFormPage;

    public CoinFormKeywords(WebDriver driver) {
        this.coinFormPage = new CoinFormPage(driver);
    }

    public void actionOpenNewCoinForm() {
        Allure.step("Open the new coin form", coinFormPage::openNew);
    }

    public void checkCoinFormShellReady() {
        Allure.step("Verify the coin form fields and submit button render",
                coinFormPage::verifyShellReady);
    }
}
