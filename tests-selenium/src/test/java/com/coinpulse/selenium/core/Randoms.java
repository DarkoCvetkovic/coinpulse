package com.coinpulse.selenium.core;

import java.util.concurrent.ThreadLocalRandom;

/**
 * Random test data helpers - keep in sync with
 * tests-cypress/cypress/support/utils/core/random.ts.
 */
public final class Randoms {

    private static final String SYMBOL_PREFIX = "Z";

    private Randoms() {
    }

    public static String randomSymbol() {
        int digits = ThreadLocalRandom.current().nextInt(100_000);
        return SYMBOL_PREFIX + "%05d".formatted(digits);
    }
}
