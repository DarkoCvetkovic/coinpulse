package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.ComparePage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * Compare keywords: specs call these, never the page object directly.
 */
public class CompareKeywords {

    private final ComparePage comparePage;

    public CompareKeywords(WebDriver driver) {
        this.comparePage = new ComparePage(driver);
    }

    public void actionOpenCompare() {
        Allure.step("Open the compare page", comparePage::open);
    }

    public void checkCompareShellReady() {
        Allure.step("Verify the compare watchlist, zone card and drop area render",
                comparePage::verifyShellReady);
    }
}
