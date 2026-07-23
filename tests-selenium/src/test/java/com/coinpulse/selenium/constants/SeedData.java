package com.coinpulse.selenium.constants;

import java.util.List;

/**
 * Deterministic facts about the seeded coins (data.sql) that tests assert
 * against - keep in sync with tests-cypress/cypress/support/constants/coins.ts.
 */
public final class SeedData {

    public record SeedCoin(int id, String symbol, String name, String price,
                           String change24h, String rank, String category, String launchDate) {
    }

    public static final SeedCoin BTC = new SeedCoin(1, "BTC", "Bitcoin", "$64,250.00",
            "+2.45%", "#1", "L1", "2009-01-03");
    public static final SeedCoin ETH = new SeedCoin(2, "ETH", "Ethereum", "$3,480.50",
            "+1.82%", "#2", "L1", "2015-07-30");
    public static final SeedCoin SOL = new SeedCoin(5, "SOL", "Solana", "$148.90",
            "+4.30%", "#5", "L1", "2020-03-16");
    public static final SeedCoin LINK = new SeedCoin(12, "LINK", "Chainlink", "$14.85",
            "+3.15%", "#12", "oracle", "2017-09-19");

    public static final List<String> WATCHLIST_SYMBOLS =
            List.of(BTC.symbol(), ETH.symbol(), SOL.symbol(), LINK.symbol());

    public static final int SEED_COIN_COUNT = 20;

    private SeedData() {
    }
}
