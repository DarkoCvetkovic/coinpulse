package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.TradeKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: trade validation. Submitting an empty trade form shows the
 * required-field messages for coin, amount, price and confirmation.
 * Estimated execution time: ~6s.
 */
class TradeValidationTest extends BaseTest {

    private TradeKeywords trade;

    @BeforeEach
    void signInAndOpenTrade() {
        loginViaApi(Users.standard());
        trade = new TradeKeywords(driver);
        trade.actionOpenTrade();
    }

    @Test
    void showsRequiredFieldErrorsWhenSubmittingAnEmptyForm() {
        trade.actionSubmitEmptyTrade();
        trade.checkTradeValidationErrors();
    }
}
