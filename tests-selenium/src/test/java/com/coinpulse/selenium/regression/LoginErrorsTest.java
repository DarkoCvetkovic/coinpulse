package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.LoginKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: login server errors. Wrong password, unknown username and a
 * locked account are all rejected with the right message.
 * Estimated execution time: ~12s.
 */
class LoginErrorsTest extends BaseTest {

    private static final String INVALID_CREDENTIALS_MESSAGE = "Invalid username or password.";
    private static final String LOCKED_ACCOUNT_MESSAGE =
            "This account is locked. Contact an administrator.";
    private static final String WRONG_PASSWORD = "WrongPass123!";

    private LoginKeywords login;

    @BeforeEach
    void initKeywords() {
        login = new LoginKeywords(driver);
    }

    @Test
    void rejectsAValidUserWithAWrongPassword() {
        var wrongPasswordUser =
                new Users.Credentials(Users.standard().username(), WRONG_PASSWORD);

        login.actionLoginViaUi(wrongPasswordUser);
        login.checkLoginServerError(INVALID_CREDENTIALS_MESSAGE);
    }

    @Test
    void rejectsAnUnknownUsername() {
        var unknownUser = new Users.Credentials("ghost_user", WRONG_PASSWORD);

        login.actionLoginViaUi(unknownUser);
        login.checkLoginServerError(INVALID_CREDENTIALS_MESSAGE);
    }

    @Test
    void explainsThatALockedAccountCannotSignIn() {
        login.actionLoginViaUi(Users.locked());
        login.checkLoginServerError(LOCKED_ACCOUNT_MESSAGE);
    }
}
