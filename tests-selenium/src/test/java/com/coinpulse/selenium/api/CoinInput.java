package com.coinpulse.selenium.api;

/**
 * Payload for POST /api/coins - mirrors the Cypress CoinInput model.
 */
public record CoinInput(String name, String symbol, double price, long marketCap,
                        double change24h, String category, String status) {

    public String toJson() {
        return ("{\"name\":\"%s\",\"symbol\":\"%s\",\"price\":%s,\"marketCap\":%s,"
                + "\"change24h\":%s,\"rank\":null,\"category\":\"%s\",\"status\":\"%s\"}")
                .formatted(name, symbol, price, marketCap, change24h, category, status);
    }
}
