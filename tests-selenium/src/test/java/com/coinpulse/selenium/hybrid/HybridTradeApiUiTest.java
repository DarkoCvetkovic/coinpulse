package com.coinpulse.selenium.hybrid;

import com.coinpulse.selenium.constants.SeedData;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.ApiKeywords;
import com.coinpulse.selenium.keywords.DashboardKeywords;
import com.coinpulse.selenium.keywords.TradeKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Hybrid API/UI: transactions. A trade recorded through the UI lands in the
 * transactions API, and an API-seeded transaction raises the dashboard count.
 * Estimated execution time: ~12s.
 */
class HybridTradeApiUiTest extends BaseTest {

    private static final int SEEDED_TRANSACTION_COUNT = 10;
    private static final int SEEDED_WATCHLIST_COUNT = 4;
    private static final String BUY_TYPE = "buy";
    private static final String BUY_AMOUNT = "2";
    private static final String BOUGHT_MESSAGE = "Bought";
    private static final String SEED_PRICE = "100";
    private static final String SEED_DATE = "2026-01-15";

    private TradeKeywords trade;
    private DashboardKeywords dashboard;
    private ApiKeywords api;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        trade = new TradeKeywords(driver);
        dashboard = new DashboardKeywords(driver);
        api = new ApiKeywords();
    }

    @Test
    void uiRecordedBuyTradeLandsInTheTransactionsApi() {
        trade.actionOpenTrade();
        trade.actionRecordTradeForCoin(SeedData.BTC.id(), BUY_TYPE, BUY_AMOUNT);
        trade.checkTradeSuccess(BOUGHT_MESSAGE);

        api.checkLatestTransaction(Users.standard(), SEEDED_TRANSACTION_COUNT + 1,
                SeedData.BTC.symbol(), BUY_TYPE, Double.parseDouble(BUY_AMOUNT));
    }

    @Test
    void apiSeededTransactionRaisesTheDashboardTransactionCount() {
        api.actionSeedTransaction(Users.standard(), SeedData.BTC.id(), BUY_TYPE,
                BUY_AMOUNT, SEED_PRICE, SEED_DATE);

        dashboard.actionOpenDashboard();
        dashboard.checkPortfolioStats(SEEDED_TRANSACTION_COUNT + 1, SEEDED_WATCHLIST_COUNT);
    }
}
