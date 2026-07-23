package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.core.Randoms;
import com.coinpulse.selenium.keywords.CoinFormKeywords;
import com.coinpulse.selenium.keywords.MarketsKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: coin form create. An admin creates a coin through the form
 * and finds it in the markets table.
 * Estimated execution time: ~8s.
 */
class CoinFormCreateTest extends BaseTest {

    private CoinFormKeywords coinForm;
    private MarketsKeywords markets;

    @BeforeEach
    void signInAsAdmin() {
        loginViaApi(Users.admin());
        coinForm = new CoinFormKeywords(driver);
        markets = new MarketsKeywords(driver);
    }

    @Test
    void createsACoinAndListsItInTheMarketsTable() {
        String symbol = Randoms.randomSymbol();
        String coinName = "Test Coin " + symbol;

        coinForm.actionOpenNewCoinForm();
        coinForm.actionSubmitNewCoin(coinName, symbol);
        markets.checkLandedOnMarkets();
        markets.actionSearchCoins(symbol);
        markets.checkCoinRowVisible(symbol);
    }
}
