package com.coinpulse.selenium.api;

/**
 * Transaction returned by the backend API - the subset of fields tests
 * assert on.
 */
public record TransactionSummary(long id, String coinSymbol, String type, double amount) {
}
