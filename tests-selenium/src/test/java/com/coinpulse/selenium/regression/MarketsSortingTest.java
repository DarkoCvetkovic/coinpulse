package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.SeedData;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.MarketsKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: markets sorting. Coins list by rank ascending by default and
 * clicking a column toggles the sort direction.
 * Estimated execution time: ~10s.
 */
class MarketsSortingTest extends BaseTest {

    private static final String NAME_COLUMN = "name";
    private static final String ASCENDING = "asc";
    private static final String DESCENDING = "desc";

    private MarketsKeywords markets;

    @BeforeEach
    void signInAndOpenMarkets() {
        loginViaApi(Users.standard());
        markets = new MarketsKeywords(driver);
        markets.actionOpenMarkets();
    }

    @Test
    void listsCoinsByRankAscendingByDefaultWithBtcFirst() {
        String topRankedSymbol = SeedData.BTC.symbol();

        markets.checkFirstCoinRow(topRankedSymbol);
    }

    @Test
    void togglesTheSortDirectionWhenTheSameColumnIsClickedTwice() {
        markets.actionSortBy(NAME_COLUMN);
        markets.checkSortIndicator(NAME_COLUMN, ASCENDING);
        markets.actionSortBy(NAME_COLUMN);
        markets.checkSortIndicator(NAME_COLUMN, DESCENDING);
    }
}
