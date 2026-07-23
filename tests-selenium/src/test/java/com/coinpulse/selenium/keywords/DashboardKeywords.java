package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.DashboardPage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * Dashboard keywords: specs call these, never the page object directly.
 */
public class DashboardKeywords {

    private final DashboardPage dashboardPage;

    public DashboardKeywords(WebDriver driver) {
        this.dashboardPage = new DashboardPage(driver);
    }

    public void actionOpenDashboard() {
        Allure.step("Open the dashboard", dashboardPage::open);
    }

    public void checkPortfolioStats(int transactionCount, int watchlistCount) {
        Allure.step("Verify portfolio stats - transactions: " + transactionCount
                + ", watchlist: " + watchlistCount, () -> {
            dashboardPage.verifyTransactionsCount(transactionCount);
            dashboardPage.verifyWatchlistCount(watchlistCount);
        });
    }

    public void checkDashboardShellReady() {
        Allure.step("Verify the dashboard stat cards, price chart and top movers render", () -> {
            dashboardPage.verifyStatsVisible();
            dashboardPage.verifyChartVisible();
            dashboardPage.verifyTopMoversVisible();
        });
    }
}
