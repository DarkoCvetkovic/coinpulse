package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.CoinFormKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Smoke: coin form page. Signs in as the admin over the API and verifies the
 * new-coin form shell renders with its fields and submit button.
 * Estimated execution time: ~6s.
 */
class CoinFormSmokeTest extends BaseTest {

    private CoinFormKeywords coinForm;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.admin());
        coinForm = new CoinFormKeywords(driver);
    }

    @Test
    void rendersTheNewCoinFormShell() {
        coinForm.actionOpenNewCoinForm();
        coinForm.checkCoinFormShellReady();
    }
}
