package com.coinpulse.selenium.hybrid;

import com.coinpulse.selenium.api.Coin;
import com.coinpulse.selenium.api.CoinBuilders;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.ApiKeywords;
import com.coinpulse.selenium.keywords.MarketsKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Hybrid API/UI: coin catalog. Coins created or deleted over the API are
 * reflected in the markets table, and a UI delete is confirmed over the API.
 * Estimated execution time: ~16s.
 */
class HybridCoinApiUiTest extends BaseTest {

    private MarketsKeywords markets;
    private ApiKeywords api;

    @BeforeEach
    void signInAsAdmin() {
        loginViaApi(Users.admin());
        markets = new MarketsKeywords(driver);
        api = new ApiKeywords();
    }

    @Test
    void apiCreatedCoinAppearsInTheMarketsTable() {
        Coin coin = api.actionSeedCoin(CoinBuilders.buildCoin());

        markets.actionOpenMarkets();
        markets.actionSearchCoins(coin.symbol());
        markets.checkCoinRowVisible(coin.symbol());
    }

    @Test
    void apiDeletedCoinDisappearsFromTheMarketsTable() {
        Coin coin = api.actionSeedCoin(CoinBuilders.buildCoin());
        markets.actionOpenMarkets();
        markets.actionSearchCoins(coin.symbol());
        markets.checkCoinRowVisible(coin.symbol());

        api.actionDeleteCoinViaApi(coin);

        markets.actionOpenMarkets();
        markets.actionSearchCoins(coin.symbol());
        markets.checkCoinRowAbsent(coin.symbol());
    }

    @Test
    void uiDeletedCoinIsGoneFromTheMarketsTableAndTheApi() {
        Coin coin = api.actionSeedCoin(CoinBuilders.buildCoin());
        markets.actionOpenMarkets();
        markets.actionSearchCoins(coin.symbol());
        markets.checkCoinRowVisible(coin.symbol());

        markets.actionDeleteCoin(coin.symbol());

        markets.checkCoinRowAbsent(coin.symbol());
        api.checkCoinAbsentFromApi(coin.symbol());
    }
}
