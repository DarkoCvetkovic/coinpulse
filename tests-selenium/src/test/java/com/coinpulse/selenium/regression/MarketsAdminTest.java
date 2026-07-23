package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.SeedData;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.MarketsKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: markets admin controls. Add, edit and delete are admin-only
 * and cancelling the delete confirmation keeps the coin.
 * Estimated execution time: ~14s.
 */
class MarketsAdminTest extends BaseTest {

    private MarketsKeywords markets;

    @BeforeEach
    void initKeywords() {
        markets = new MarketsKeywords(driver);
    }

    @Test
    void hidesAdminControlsForAStandardUser() {
        loginViaApi(Users.standard());
        markets.actionOpenMarkets();
        markets.checkAdminControlsAbsent(SeedData.BTC.symbol());
    }

    @Test
    void showsAdminControlsForAnAdminUser() {
        loginViaApi(Users.admin());
        markets.actionOpenMarkets();
        markets.checkAdminControlsVisible(SeedData.BTC.symbol());
    }

    @Test
    void opensAndCancelsTheDeleteConfirmationWithoutRemovingTheCoin() {
        String coinSymbol = SeedData.BTC.symbol();

        loginViaApi(Users.admin());
        markets.actionOpenMarkets();
        markets.actionCancelDeleteCoin(coinSymbol);
        markets.checkCoinRowVisible(coinSymbol);
    }
}
