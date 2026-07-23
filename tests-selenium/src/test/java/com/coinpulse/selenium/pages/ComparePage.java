package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Compare page object; selectors mirror the Cypress compare page object.
 */
public class ComparePage extends BasePage {

    private static final By PAGE = byTestId("compare-page");
    private static final By WATCHLIST = byTestId("compare-watchlist");
    private static final By WATCHLIST_CARD = byTestId("compare-watchlist-card");
    private static final By ZONE_CARD = byTestId("compare-zone-card");
    private static final By DROP_AREA = byTestId("compare-zone");
    private static final By RESULTS_CARD = byTestId("compare-results-card");
    private static final By CHART_ITEMS =
            By.cssSelector("[data-testid='compare-charts'] [data-testid='price-chart']");

    public ComparePage(WebDriver driver) {
        super(driver);
    }

    private static By watchlistItem(String symbol) {
        return byTestId("compare-watchlist-item-" + symbol);
    }

    private static By tab(String key) {
        return byTestId("compare-tabs-" + key);
    }

    private static By overviewColumn(String symbol) {
        return byTestId("compare-col-" + symbol);
    }

    private static By overviewValue(String metric, String symbol) {
        return byTestId("compare-value-" + metric + "-" + symbol);
    }

    private static By newsItem(long coinId, int ordinal) {
        return byTestId("compare-news-" + coinId + "-" + ordinal);
    }

    private static By faqToggle(String key) {
        return byTestId("compare-faq-toggle-" + key);
    }

    private static By faqContent(String key) {
        return byTestId("compare-faq-content-" + key);
    }

    public void open() {
        openPath(Routes.COMPARE);
        awaitVisible(PAGE);
        awaitVisible(WATCHLIST);
    }

    public void verifyShellReady() {
        awaitVisible(WATCHLIST_CARD);
        awaitVisible(ZONE_CARD);
        awaitVisible(DROP_AREA);
    }

    public void addByDoubleClick(String symbol) {
        doubleClick(watchlistItem(symbol));
    }

    public void selectTab(String key) {
        click(tab(key));
    }

    public void toggleFaq(String key) {
        click(faqToggle(key));
    }

    public void verifyResultsShown() {
        awaitVisible(RESULTS_CARD);
    }

    public void verifyOverviewColumn(String symbol, String coinName) {
        awaitTextContains(overviewColumn(symbol), coinName);
    }

    public void verifyOverviewValue(String metric, String symbol, String expected) {
        awaitTextContains(overviewValue(metric, symbol), expected);
    }

    public void verifyChartCount(int count) {
        wait.until(ExpectedConditions.numberOfElementsToBe(CHART_ITEMS, count));
    }

    public void verifyNewsHeadline(long coinId, int ordinal, String headline) {
        awaitTextContains(newsItem(coinId, ordinal), headline);
    }

    public void verifyFaqAnswerShown(String key, String textFragment) {
        awaitTextContains(faqContent(key), textFragment);
    }

    public void verifyFaqAnswerHidden(String key) {
        awaitAbsent(faqContent(key));
    }
}
