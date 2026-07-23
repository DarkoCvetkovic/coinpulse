package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Dashboard page object; selectors mirror the Cypress dashboard page object.
 */
public class DashboardPage extends BasePage {

    private static final By PAGE = byTestId("dashboard-page");
    private static final By STAT_PORTFOLIO_VALUE = byTestId("stat-portfolio-value");
    private static final By STAT_24H_CHANGE = byTestId("stat-24h-change");
    private static final By STAT_WATCHLIST = byTestId("stat-watchlist");
    private static final By STAT_WATCHLIST_VALUE = byTestId("stat-watchlist-value");
    private static final By STAT_TRANSACTIONS = byTestId("stat-transactions");
    private static final By STAT_TRANSACTIONS_VALUE = byTestId("stat-transactions-value");
    private static final By CHART_CARD = byTestId("dashboard-chart-card");
    private static final By TOP_GAINERS = byTestId("top-gainers");
    private static final By TOP_LOSERS = byTestId("top-losers");

    public DashboardPage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        openPath(Routes.DASHBOARD);
        awaitVisible(PAGE);
    }

    public void awaitLoaded() {
        awaitVisible(PAGE);
    }

    public void verifyStatsVisible() {
        awaitVisible(STAT_PORTFOLIO_VALUE);
        awaitVisible(STAT_24H_CHANGE);
        awaitVisible(STAT_WATCHLIST);
        awaitVisible(STAT_TRANSACTIONS);
    }

    public void verifyChartVisible() {
        awaitVisible(CHART_CARD);
    }

    public void verifyTopMoversVisible() {
        awaitVisible(TOP_GAINERS);
        awaitVisible(TOP_LOSERS);
    }

    public void verifyTransactionsCount(int count) {
        wait.until(ExpectedConditions.textToBe(STAT_TRANSACTIONS_VALUE, String.valueOf(count)));
    }

    public void verifyWatchlistCount(int count) {
        wait.until(ExpectedConditions.textToBe(STAT_WATCHLIST_VALUE, String.valueOf(count)));
    }
}
