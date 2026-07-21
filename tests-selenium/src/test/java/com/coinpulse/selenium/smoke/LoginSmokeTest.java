package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.pages.DashboardPage;
import com.coinpulse.selenium.pages.LoginPage;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Smoke: login. Covers the interactive login form shell and a valid sign-in
 * landing on the dashboard.
 * Estimated execution time: ~10s.
 */
class LoginSmokeTest extends BaseTest {

    @Test
    void rendersAnInteractiveLoginForm() {
        LoginPage loginPage = new LoginPage(driver).open();

        assertThat(loginPage.isUsernameVisible()).isTrue();
        assertThat(loginPage.isPasswordVisible()).isTrue();
        assertThat(loginPage.isSubmitEnabled()).isTrue();
    }

    @Test
    void signsInWithValidCredentialsAndLandsOnTheDashboard() {
        Users.Credentials standardUser = Users.standard();
        LoginPage loginPage = new LoginPage(driver).open();

        loginPage.loginAs(standardUser.username(), standardUser.password());

        DashboardPage dashboardPage = new DashboardPage(driver).awaitLoaded();
        assertThat(dashboardPage.isLoaded()).isTrue();
        assertThat(driver.getCurrentUrl()).contains("/dashboard");
    }
}
