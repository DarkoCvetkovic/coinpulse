package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.DynamicPage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * Dynamic elements keywords: specs call these, never the page object directly.
 */
public class DynamicKeywords {

    private final DynamicPage dynamicPage;

    public DynamicKeywords(WebDriver driver) {
        this.dynamicPage = new DynamicPage(driver);
    }

    public void actionOpenDynamic() {
        Allure.step("Open the dynamic elements page", dynamicPage::open);
    }

    public void checkDynamicShellReady() {
        Allure.step("Verify the live ticker card, delayed button and lazy list render",
                dynamicPage::verifyShellReady);
    }
}
