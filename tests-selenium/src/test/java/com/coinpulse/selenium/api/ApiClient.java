package com.coinpulse.selenium.api;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.Config;
import io.restassured.http.ContentType;

import java.util.ArrayList;
import java.util.List;

import static io.restassured.RestAssured.given;

/**
 * REST-assured helpers for backend state: seed reset and API login.
 * Mirrors the Cypress commands/api layer.
 */
public final class ApiClient {

    private ApiClient() {
    }

    public static void resetBackend() {
        given().baseUri(Config.apiUrl())
                .when().post("/api/test/reset")
                .then().statusCode(200);
    }

    public static String loginToken(String username, String password) {
        return loginSession(username, password).token();
    }

    public static String adminToken() {
        var admin = Users.admin();
        return loginToken(admin.username(), admin.password());
    }

    public static Coin createCoin(CoinInput coin) {
        var body = given().baseUri(Config.apiUrl())
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + adminToken())
                .body(coin.toJson())
                .when().post("/api/coins")
                .then().statusCode(201)
                .extract().body().jsonPath();
        return new Coin(body.getLong("id"), body.getString("name"), body.getString("symbol"));
    }

    public static void deleteCoin(long id) {
        given().baseUri(Config.apiUrl())
                .header("Authorization", "Bearer " + adminToken())
                .when().delete("/api/coins/" + id)
                .then().statusCode(204);
    }

    public static List<String> searchCoinSymbols(String term) {
        var body = given().baseUri(Config.apiUrl())
                .header("Authorization", "Bearer " + adminToken())
                .queryParam("search", term)
                .when().get("/api/coins")
                .then().statusCode(200)
                .extract().body().jsonPath();
        return body.getList("content.symbol");
    }

    public static List<TransactionSummary> getTransactions(String token) {
        var body = given().baseUri(Config.apiUrl())
                .header("Authorization", "Bearer " + token)
                .when().get("/api/transactions")
                .then().statusCode(200)
                .extract().body().jsonPath();
        List<Object> raw = body.getList("$");
        List<TransactionSummary> transactions = new ArrayList<>();
        for (int i = 0; i < raw.size(); i++) {
            transactions.add(new TransactionSummary(
                    body.getLong("[" + i + "].id"),
                    body.getString("[" + i + "].coin.symbol"),
                    body.getString("[" + i + "].type"),
                    body.getDouble("[" + i + "].amount")));
        }
        return transactions;
    }

    public static void createTransaction(String token, long coinId, String type,
                                         String amount, String price, String date) {
        var payload = ("{\"coinId\":%d,\"type\":\"%s\",\"amount\":%s,\"price\":%s,"
                + "\"date\":\"%s\",\"note\":null}")
                .formatted(coinId, type, amount, price, date);
        given().baseUri(Config.apiUrl())
                .contentType(ContentType.JSON)
                .header("Authorization", "Bearer " + token)
                .body(payload)
                .when().post("/api/transactions")
                .then().statusCode(201);
    }

    public static List<Long> getWatchlistCoinIds(String token) {
        var body = given().baseUri(Config.apiUrl())
                .header("Authorization", "Bearer " + token)
                .when().get("/api/watchlist")
                .then().statusCode(200)
                .extract().body().jsonPath();
        List<Object> raw = body.getList("$");
        List<Long> coinIds = new ArrayList<>();
        for (int i = 0; i < raw.size(); i++) {
            coinIds.add(body.getLong("[" + i + "].coin.id"));
        }
        return coinIds;
    }

    public static AuthSession loginSession(String username, String password) {
        var body = given().baseUri(Config.apiUrl())
                .contentType(ContentType.JSON)
                .body("{\"username\":\"%s\",\"password\":\"%s\"}".formatted(username, password))
                .when().post("/api/auth/login")
                .then().statusCode(200)
                .extract().body().jsonPath();
        return new AuthSession(body.getString("token"), body.getString("username"),
                body.getString("role"));
    }
}
