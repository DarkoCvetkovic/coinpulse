package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.CompareKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Smoke: compare page. Signs in as the standard user over the API and
 * verifies the watchlist card, compare zone card and drop area render.
 * Estimated execution time: ~6s.
 */
class CompareSmokeTest extends BaseTest {

    private CompareKeywords compare;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        compare = new CompareKeywords(driver);
    }

    @Test
    void rendersTheCompareBuilderShell() {
        compare.actionOpenCompare();
        compare.checkCompareShellReady();
    }
}
