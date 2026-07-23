package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.SeedData;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.MarketsKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: markets status filtering. The delisted and active filters show
 * only coins with the matching status.
 * Estimated execution time: ~10s.
 */
class MarketsFilteringTest extends BaseTest {

    private static final String TERRA_CLASSIC = "LUNC";
    private static final String FTX_TOKEN = "FTT";
    private static final String DELISTED_STATUS = "delisted";
    private static final String ACTIVE_STATUS = "active";

    private MarketsKeywords markets;

    @BeforeEach
    void signInAndOpenMarkets() {
        loginViaApi(Users.standard());
        markets = new MarketsKeywords(driver);
        markets.actionOpenMarkets();
    }

    @Test
    void showsOnlyDelistedCoinsWhenFilteredByDelistedStatus() {
        markets.actionFilterByStatus(DELISTED_STATUS);
        markets.checkCoinRowVisible(TERRA_CLASSIC);
        markets.checkCoinRowVisible(FTX_TOKEN);
        markets.checkCoinRowAbsent(SeedData.BTC.symbol());
    }

    @Test
    void showsOnlyActiveCoinsWhenFilteredByActiveStatus() {
        markets.actionFilterByStatus(ACTIVE_STATUS);
        markets.checkCoinRowVisible(SeedData.BTC.symbol());
        markets.checkCoinRowAbsent(TERRA_CLASSIC);
    }
}
