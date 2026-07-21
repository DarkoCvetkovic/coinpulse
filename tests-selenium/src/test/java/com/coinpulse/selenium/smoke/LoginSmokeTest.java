package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.LoginKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Smoke: login. Covers the interactive login form shell and a valid sign-in
 * landing on the dashboard.
 * Estimated execution time: ~10s.
 */
class LoginSmokeTest extends BaseTest {

    private LoginKeywords login;

    @BeforeEach
    void initKeywords() {
        login = new LoginKeywords(driver);
    }

    @Test
    void rendersAnInteractiveLoginForm() {
        login.actionOpenLogin();
        login.checkLoginShellReady();
    }

    @Test
    void signsInWithValidCredentialsAndLandsOnTheDashboard() {
        Users.Credentials standardUser = Users.standard();

        login.actionOpenLogin();
        login.actionLogin(standardUser.username(), standardUser.password());
        login.checkLandedOnDashboard();
    }
}
