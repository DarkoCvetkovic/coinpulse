package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.ApiExplorerPage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * API Explorer keywords: specs call these, never the page object directly.
 */
public class ApiExplorerKeywords {

    private final ApiExplorerPage apiExplorerPage;

    public ApiExplorerKeywords(WebDriver driver) {
        this.apiExplorerPage = new ApiExplorerPage(driver);
    }

    public void actionOpenApiExplorer() {
        Allure.step("Open the API Explorer page", apiExplorerPage::open);
    }

    public void checkApiExplorerShellReady() {
        Allure.step("Verify the API Explorer renders its request groups and empty response state",
                apiExplorerPage::verifyShellReady);
    }
}
