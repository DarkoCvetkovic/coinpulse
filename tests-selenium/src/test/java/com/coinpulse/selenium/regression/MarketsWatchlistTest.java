package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.SeedData;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.MarketsKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: markets watchlist. Seeded stars render as on and the star
 * toggles off and back on.
 * Estimated execution time: ~10s.
 */
class MarketsWatchlistTest extends BaseTest {

    private MarketsKeywords markets;

    @BeforeEach
    void signInAndOpenMarkets() {
        loginViaApi(Users.standard());
        markets = new MarketsKeywords(driver);
        markets.actionOpenMarkets();
    }

    @Test
    void showsASeededCoinAsStarred() {
        markets.checkWatchlistStarOn(SeedData.BTC.symbol());
    }

    @Test
    void removesAndReAddsACoinToTheWatchlist() {
        String watchlistedSymbol = SeedData.BTC.symbol();

        markets.checkWatchlistStarOn(watchlistedSymbol);
        markets.actionToggleWatchlist(watchlistedSymbol);
        markets.checkWatchlistStarOff(watchlistedSymbol);
        markets.actionToggleWatchlist(watchlistedSymbol);
        markets.checkWatchlistStarOn(watchlistedSymbol);
    }
}
