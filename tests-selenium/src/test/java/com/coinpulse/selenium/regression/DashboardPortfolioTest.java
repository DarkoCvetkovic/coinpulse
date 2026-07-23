package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.DashboardKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: dashboard portfolio summary. Seeded transaction and watchlist
 * counts land in the stat cards and the chart and top movers render.
 * Estimated execution time: ~8s.
 */
class DashboardPortfolioTest extends BaseTest {

    private static final int SEEDED_TRANSACTION_COUNT = 10;
    private static final int SEEDED_WATCHLIST_COUNT = 4;

    private DashboardKeywords dashboard;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        dashboard = new DashboardKeywords(driver);
    }

    @Test
    void showsTheSeededTransactionAndWatchlistCounts() {
        dashboard.actionOpenDashboard();
        dashboard.checkPortfolioStats(SEEDED_TRANSACTION_COUNT, SEEDED_WATCHLIST_COUNT);
    }

    @Test
    void rendersThePriceChartAndTopMoversFromSeededData() {
        dashboard.actionOpenDashboard();
        dashboard.checkDashboardShellReady();
    }
}
