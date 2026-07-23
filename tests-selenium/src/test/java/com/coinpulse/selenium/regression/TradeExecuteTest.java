package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.TradeKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: trade execution. Buy and sell trades submit successfully and
 * show the right confirmation message.
 * Estimated execution time: ~10s.
 */
class TradeExecuteTest extends BaseTest {

    private static final String BUY_TYPE = "buy";
    private static final String SELL_TYPE = "sell";
    private static final String BUY_AMOUNT = "2";
    private static final String SELL_AMOUNT = "1";
    private static final String BOUGHT_MESSAGE = "Bought";
    private static final String SOLD_MESSAGE = "Sold";

    private TradeKeywords trade;

    @BeforeEach
    void signInAndOpenTrade() {
        loginViaApi(Users.standard());
        trade = new TradeKeywords(driver);
        trade.actionOpenTrade();
    }

    @Test
    void recordsABuyTradeAndShowsASuccessMessage() {
        trade.actionRecordTrade(BUY_TYPE, BUY_AMOUNT);
        trade.checkTradeSuccess(BOUGHT_MESSAGE);
    }

    @Test
    void recordsASellTradeAndShowsASuccessMessage() {
        trade.actionRecordTrade(SELL_TYPE, SELL_AMOUNT);
        trade.checkTradeSuccess(SOLD_MESSAGE);
    }
}
