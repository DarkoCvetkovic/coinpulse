package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.constants.Routes;
import com.coinpulse.selenium.pages.DashboardPage;
import com.coinpulse.selenium.pages.LoginPage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Login keywords: specs call these, never the page object directly.
 */
public class LoginKeywords {

    private final WebDriver driver;
    private final LoginPage loginPage;
    private final DashboardPage dashboardPage;

    public LoginKeywords(WebDriver driver) {
        this.driver = driver;
        this.loginPage = new LoginPage(driver);
        this.dashboardPage = new DashboardPage(driver);
    }

    public void actionOpenLogin() {
        Allure.step("Open the login page", loginPage::open);
    }

    public void actionLogin(String username, String password) {
        Allure.step("Log in as: " + username, () -> loginPage.loginAs(username, password));
    }

    public void checkLoginShellReady() {
        Allure.step("Verify the login form renders and is interactive",
                loginPage::verifyShellReady);
    }

    public void checkLandedOnDashboard() {
        Allure.step("Verify navigation landed on the dashboard", () -> {
            dashboardPage.awaitLoaded();
            assertThat(driver.getCurrentUrl()).contains(Routes.DASHBOARD);
        });
    }
}
