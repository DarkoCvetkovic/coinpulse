package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.Routes;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.LoginKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: coin form admin guard. A standard user is redirected away
 * from the new coin form.
 * Estimated execution time: ~5s.
 */
class CoinFormAdminGuardTest extends BaseTest {

    private LoginKeywords login;

    @BeforeEach
    void initKeywords() {
        login = new LoginKeywords(driver);
    }

    @Test
    void redirectsAStandardUserAwayFromTheNewCoinForm() {
        loginViaApi(Users.standard());
        login.actionAttemptVisit(Routes.COIN_NEW);
        login.checkLandedOnDashboard();
    }
}
