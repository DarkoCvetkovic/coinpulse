package com.coinpulse.selenium.api;

import com.coinpulse.selenium.core.Config;
import io.restassured.http.ContentType;

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
        return given().baseUri(Config.apiUrl())
                .contentType(ContentType.JSON)
                .body("{\"username\":\"%s\",\"password\":\"%s\"}".formatted(username, password))
                .when().post("/api/auth/login")
                .then().statusCode(200)
                .extract().path("token");
    }
}
