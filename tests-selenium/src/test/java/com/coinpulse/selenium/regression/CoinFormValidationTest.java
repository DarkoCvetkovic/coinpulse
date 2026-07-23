package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.CoinFormKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: coin form validation. Submitting the empty form shows the
 * required-field messages for name, symbol, price and category.
 * Estimated execution time: ~5s.
 */
class CoinFormValidationTest extends BaseTest {

    private CoinFormKeywords coinForm;

    @BeforeEach
    void signInAsAdminAndOpenForm() {
        loginViaApi(Users.admin());
        coinForm = new CoinFormKeywords(driver);
        coinForm.actionOpenNewCoinForm();
    }

    @Test
    void showsRequiredFieldErrorsWhenSubmittingAnEmptyForm() {
        coinForm.actionSubmitEmptyCoinForm();
        coinForm.checkCoinFormRequiredErrors();
    }
}
