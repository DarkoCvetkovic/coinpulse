package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.MarketsKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Smoke: markets page. Signs in as the standard user over the API and
 * verifies the markets table, search and filters render.
 * Estimated execution time: ~6s.
 */
class MarketsSmokeTest extends BaseTest {

    private MarketsKeywords markets;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        markets = new MarketsKeywords(driver);
    }

    @Test
    void rendersTheMarketsTableSearchAndFilters() {
        markets.actionOpenMarkets();
        markets.checkMarketsShellReady();
    }
}
