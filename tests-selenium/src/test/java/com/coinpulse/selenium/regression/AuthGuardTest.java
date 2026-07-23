package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.Routes;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.LoginKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: auth route guard. Protected pages redirect to the login,
 * sign-in returns to the requested page and logout locks the app again.
 * Estimated execution time: ~16s.
 */
class AuthGuardTest extends BaseTest {

    private LoginKeywords login;

    @BeforeEach
    void initKeywords() {
        login = new LoginKeywords(driver);
    }

    @Test
    void redirectsAnUnauthenticatedVisitorFromAProtectedPageToTheLogin() {
        login.actionAttemptVisit(Routes.DASHBOARD);

        login.checkRedirectedToLogin();
    }

    @Test
    void returnsToTheOriginallyRequestedPageAfterSigningIn() {
        login.actionAttemptVisit(Routes.MARKETS);
        login.checkRedirectedToLogin();

        login.actionSubmitLoginForm(Users.standard());

        login.checkLandedOn(Routes.MARKETS);
    }

    @Test
    void keepsAnAuthenticatedUserAwayFromTheLoginPage() {
        loginViaApi(Users.standard());

        login.actionAttemptVisit(Routes.LOGIN);

        login.checkLandedOn(Routes.DASHBOARD);
    }

    @Test
    void locksTheAppAgainAfterLoggingOut() {
        loginViaApi(Users.standard());
        login.actionAttemptVisit(Routes.DASHBOARD);

        login.actionLogout();
        login.checkRedirectedToLogin();

        login.actionAttemptVisit(Routes.DASHBOARD);
        login.checkRedirectedToLogin();
    }
}
