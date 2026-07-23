package com.coinpulse.selenium.api;

/**
 * Coin returned by the backend API - the subset of fields tests assert on.
 */
public record Coin(long id, String name, String symbol) {
}
