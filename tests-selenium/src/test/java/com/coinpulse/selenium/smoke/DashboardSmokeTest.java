package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.DashboardKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Smoke: dashboard page. Signs in as the standard user over the API and
 * verifies the portfolio dashboard shell renders.
 * Estimated execution time: ~6s.
 */
class DashboardSmokeTest extends BaseTest {

    private DashboardKeywords dashboard;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        dashboard = new DashboardKeywords(driver);
    }

    @Test
    void rendersThePortfolioDashboardShell() {
        dashboard.actionOpenDashboard();
        dashboard.checkDashboardShellReady();
    }
}
