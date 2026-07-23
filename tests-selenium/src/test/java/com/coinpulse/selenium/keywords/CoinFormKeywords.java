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

    public void actionOpenEditCoinForm(long id) {
        Allure.step("Open the edit form for coin id: " + id,
                () -> coinFormPage.openEdit(id));
    }

    public void actionSubmitNewCoin(String name, String symbol) {
        Allure.step("Fill and submit a new coin: " + name + " (" + symbol + ")", () -> {
            coinFormPage.fillValid(name, symbol);
            coinFormPage.submit();
        });
    }

    public void actionSubmitEmptyCoinForm() {
        Allure.step("Submit the coin form empty to trigger validation",
                coinFormPage::submit);
    }

    public void checkCoinFormShellReady() {
        Allure.step("Verify the coin form fields and submit button render",
                coinFormPage::verifyShellReady);
    }

    public void checkCoinFormRequiredErrors() {
        Allure.step("Verify required-field validation on the coin form",
                coinFormPage::verifyRequiredErrors);
    }

    public void checkCoinNamePrefilled(String name) {
        Allure.step("Verify the coin form is prefilled with name: " + name,
                () -> coinFormPage.verifyNameValue(name));
    }
}
