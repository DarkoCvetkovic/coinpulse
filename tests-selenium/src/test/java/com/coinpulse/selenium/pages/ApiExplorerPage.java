package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * API Explorer page object; selectors mirror the Cypress page object.
 */
public class ApiExplorerPage extends BasePage {

    private static final By PAGE = byTestId("api-explorer-page");
    private static final By GROUP_COINS = byTestId("api-group-coins");
    private static final By GROUP_SIMULATIONS = byTestId("api-group-simulations");
    private static final By RESPONSE_EMPTY = byTestId("api-response-empty");

    public ApiExplorerPage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        openPath(Routes.API_EXPLORER);
        awaitVisible(PAGE);
    }

    public void verifyShellReady() {
        awaitVisible(GROUP_COINS);
        awaitVisible(GROUP_SIMULATIONS);
        awaitVisible(RESPONSE_EMPTY);
    }
}
