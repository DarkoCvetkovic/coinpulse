package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.api.ApiClient;
import com.coinpulse.selenium.api.Coin;
import com.coinpulse.selenium.api.CoinBuilders;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.CoinFormKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: coin form edit. An API-seeded coin loads prefilled into the
 * edit form.
 * Estimated execution time: ~6s.
 */
class CoinFormEditTest extends BaseTest {

    private CoinFormKeywords coinForm;

    @BeforeEach
    void signInAsAdmin() {
        loginViaApi(Users.admin());
        coinForm = new CoinFormKeywords(driver);
    }

    @Test
    void loadsAnExistingCoinIntoTheEditForm() {
        Coin coin = ApiClient.createCoin(CoinBuilders.buildCoin());

        coinForm.actionOpenEditCoinForm(coin.id());
        coinForm.checkCoinNamePrefilled(coin.name());
    }
}
