package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.SeedData;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.MarketsKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: markets search. The table narrows to matching coins and shows
 * the empty state when nothing matches.
 * Estimated execution time: ~10s.
 */
class MarketsSearchTest extends BaseTest {

    private static final String MISSING_TERM = "zzznotacoin";

    private MarketsKeywords markets;

    @BeforeEach
    void signInAndOpenMarkets() {
        loginViaApi(Users.standard());
        markets = new MarketsKeywords(driver);
        markets.actionOpenMarkets();
    }

    @Test
    void filtersTheTableToACoinMatchedBySymbol() {
        String searchSymbol = SeedData.ETH.symbol();
        String otherSymbol = SeedData.BTC.symbol();

        markets.actionSearchCoins(searchSymbol);
        markets.checkCoinRowVisible(searchSymbol);
        markets.checkCoinRowAbsent(otherSymbol);
    }

    @Test
    void showsTheEmptyStateWhenNoCoinMatches() {
        markets.actionSearchCoins(MISSING_TERM);
        markets.checkMarketsEmptyState();
    }
}
