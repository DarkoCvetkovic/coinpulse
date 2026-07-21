package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.TradeKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Smoke: trade page. Signs in as the standard user over the API and verifies
 * the trade form renders.
 * Estimated execution time: ~6s.
 */
class TradeSmokeTest extends BaseTest {

    private TradeKeywords trade;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        trade = new TradeKeywords(driver);
    }

    @Test
    void rendersTheTradeForm() {
        trade.actionOpenTrade();
        trade.checkTradeShellReady();
    }
}
