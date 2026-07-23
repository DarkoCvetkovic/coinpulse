package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.LoginKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: login client-side validation. Required-field messages appear
 * for missing input and only for the fields that are actually empty.
 * Estimated execution time: ~8s.
 */
class LoginValidationTest extends BaseTest {

    private static final String USERNAME_REQUIRED = "Username is required";
    private static final String PASSWORD_REQUIRED = "Password is required";

    private LoginKeywords login;

    @BeforeEach
    void openLogin() {
        login = new LoginKeywords(driver);
        login.actionOpenLogin();
    }

    @Test
    void requiresBothFieldsWhenTheFormIsSubmittedEmpty() {
        login.actionSubmitEmptyLoginForm();
        login.checkLoginValidationErrors();
        login.checkUsernameRequiredError(USERNAME_REQUIRED);
        login.checkPasswordRequiredError(PASSWORD_REQUIRED);
    }

    @Test
    void requiresOnlyTheMissingPasswordWhenTheUsernameIsFilled() {
        var usernameOnly = new Users.Credentials(Users.standard().username(), "");

        login.actionSubmitLoginForm(usernameOnly);
        login.checkPasswordRequiredError(PASSWORD_REQUIRED);
        login.checkNoUsernameError();
    }
}
