package com.coinpulse.selenium.hybrid;

import com.coinpulse.selenium.constants.SeedData;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.ApiKeywords;
import com.coinpulse.selenium.keywords.MarketsKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Hybrid API/UI: watchlist. Removing a star in the markets table is
 * persisted by the watchlist API.
 * Estimated execution time: ~6s.
 */
class HybridWatchlistApiUiTest extends BaseTest {

    private MarketsKeywords markets;
    private ApiKeywords api;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        markets = new MarketsKeywords(driver);
        api = new ApiKeywords();
    }

    @Test
    void uiStarRemovalIsPersistedByTheWatchlistApi() {
        String watchlistedSymbol = SeedData.BTC.symbol();

        markets.actionOpenMarkets();
        markets.checkWatchlistStarOn(watchlistedSymbol);
        markets.actionToggleWatchlist(watchlistedSymbol);
        markets.checkWatchlistStarOff(watchlistedSymbol);

        api.checkWatchlistExcludesCoin(Users.standard(), SeedData.BTC.id());
    }
}
