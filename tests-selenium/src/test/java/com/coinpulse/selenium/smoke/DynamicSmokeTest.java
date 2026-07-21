package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.DynamicKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Smoke: dynamic elements page. Signs in as the standard user over the API
 * and verifies the live ticker card, delayed button and lazy list render.
 * Estimated execution time: ~6s.
 */
class DynamicSmokeTest extends BaseTest {

    private DynamicKeywords dynamic;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        dynamic = new DynamicKeywords(driver);
    }

    @Test
    void rendersTheDynamicElementsShell() {
        dynamic.actionOpenDynamic();
        dynamic.checkDynamicShellReady();
    }
}
