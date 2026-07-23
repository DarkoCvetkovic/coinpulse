package com.coinpulse.selenium.api;

import com.coinpulse.selenium.core.Randoms;

/**
 * Valid coin payload factories - keep in sync with
 * tests-cypress/cypress/support/utils/resources/coin-builders.ts.
 */
public final class CoinBuilders {

    private static final double DEFAULT_PRICE = 1.23;
    private static final long DEFAULT_MARKET_CAP = 1_000_000;
    private static final double DEFAULT_CHANGE_24H = 0;
    private static final String DEFAULT_CATEGORY = "L1";
    private static final String DEFAULT_STATUS = "active";

    private CoinBuilders() {
    }

    public static CoinInput buildCoin() {
        String symbol = Randoms.randomSymbol();
        return new CoinInput("Test Coin " + symbol, symbol, DEFAULT_PRICE,
                DEFAULT_MARKET_CAP, DEFAULT_CHANGE_24H, DEFAULT_CATEGORY, DEFAULT_STATUS);
    }
}
