package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.ApiExplorerKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Smoke: API Explorer page. Signs in as the standard user over the API and
 * verifies the request groups and empty response state render.
 * Estimated execution time: ~6s.
 */
class ApiExplorerSmokeTest extends BaseTest {

    private ApiExplorerKeywords apiExplorer;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        apiExplorer = new ApiExplorerKeywords(driver);
    }

    @Test
    void rendersTheRequestGroupsAndEmptyResponseState() {
        apiExplorer.actionOpenApiExplorer();
        apiExplorer.checkApiExplorerShellReady();
    }
}
