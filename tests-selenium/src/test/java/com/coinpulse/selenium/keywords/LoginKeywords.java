package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.constants.Routes;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.Config;
import com.coinpulse.selenium.pages.DashboardPage;
import com.coinpulse.selenium.pages.HeaderPage;
import com.coinpulse.selenium.pages.LoginPage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Login keywords: specs call these, never the page object directly.
 */
public class LoginKeywords {

    private final WebDriver driver;
    private final WebDriverWait wait;
    private final LoginPage loginPage;
    private final DashboardPage dashboardPage;
    private final HeaderPage headerPage;

    public LoginKeywords(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.loginPage = new LoginPage(driver);
        this.dashboardPage = new DashboardPage(driver);
        this.headerPage = new HeaderPage(driver);
    }

    public void actionOpenLogin() {
        Allure.step("Open the login page", loginPage::open);
    }

    public void actionLogin(String username, String password) {
        Allure.step("Log in as: " + username, () -> loginPage.loginAs(username, password));
    }

    public void actionLoginViaUi(Users.Credentials credentials) {
        Allure.step("Log in via the UI as user: " + credentials.username(), () -> {
            loginPage.open();
            loginPage.loginAs(credentials.username(), credentials.password());
        });
    }

    public void actionSubmitLoginForm(Users.Credentials credentials) {
        Allure.step("Submit the already open login form as user: " + credentials.username(),
                () -> {
                    if (!credentials.username().isEmpty()) {
                        loginPage.typeUsername(credentials.username());
                    }
                    if (!credentials.password().isEmpty()) {
                        loginPage.typePassword(credentials.password());
                    }
                    loginPage.submit();
                });
    }

    public void actionSubmitEmptyLoginForm() {
        Allure.step("Submit the login form with both fields empty", loginPage::submit);
    }

    public void actionAttemptVisit(String path) {
        Allure.step("Attempt to open the path directly: " + path,
                () -> driver.get(Config.baseUrl() + path));
    }

    public void actionLogout() {
        Allure.step("Log out via the header button", headerPage::logout);
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

    public void checkLoginServerError(String message) {
        Allure.step("Verify the login server error message: " + message,
                () -> loginPage.verifyServerError(message));
    }

    public void checkLoginValidationErrors() {
        Allure.step("Verify required-field validation messages are shown",
                loginPage::verifyFieldErrors);
    }

    public void checkUsernameRequiredError(String message) {
        Allure.step("Verify the username required error: " + message,
                () -> loginPage.verifyUsernameError(message));
    }

    public void checkPasswordRequiredError(String message) {
        Allure.step("Verify the password required error: " + message,
                () -> loginPage.verifyPasswordError(message));
    }

    public void checkNoUsernameError() {
        Allure.step("Verify no username validation error is shown",
                loginPage::verifyNoUsernameError);
    }

    public void checkRedirectedToLogin() {
        Allure.step("Verify the visitor was redirected to the login page", () -> {
            loginPage.awaitLoaded();
            wait.until(ExpectedConditions.urlContains(Routes.LOGIN));
        });
    }

    public void checkLandedOn(String path) {
        Allure.step("Verify the browser landed on: " + path,
                () -> wait.until(ExpectedConditions.urlContains(path)));
    }
}
