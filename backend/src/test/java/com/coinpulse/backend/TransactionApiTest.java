package com.coinpulse.backend;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class TransactionApiTest extends BaseApiTest {

    private static final String NEW_TRANSACTION_JSON = """
            {
              "coinId": 2,
              "type": "buy",
              "amount": 0.5,
              "price": 3500.00,
              "date": "2026-06-10",
              "note": "Created by automated test"
            }""";

    @Test
    @DisplayName("Standard user sees only their own seeded transactions")
    void listOwnTransactions() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/transactions")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(10)));
    }

    @Test
    @DisplayName("Creating a transaction persists it for the current user")
    void createTransaction() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(post("/api/transactions")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(NEW_TRANSACTION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.coin.symbol").value("ETH"))
                .andExpect(jsonPath("$.type").value("buy"));

        mockMvc.perform(get("/api/transactions")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(11)));
    }

    @Test
    @DisplayName("Creating a transaction for an unknown coin returns 404")
    void createTransactionUnknownCoin() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(post("/api/transactions")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(NEW_TRANSACTION_JSON.replace("\"coinId\": 2", "\"coinId\": 999")))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Invalid transaction type returns 422")
    void createTransactionInvalidType() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(post("/api/transactions")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(NEW_TRANSACTION_JSON.replace("\"type\": \"buy\"", "\"type\": \"swap\"")))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.errors.type").exists());
    }

    @Test
    @DisplayName("A user cannot touch another user's transaction (404, no data leak)")
    void cannotDeleteForeignTransaction() throws Exception {
        // transaction id 11 belongs to admin (see data.sql)
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(delete("/api/transactions/11")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/test/reset restores the seed state")
    void resetRestoresSeedState() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(post("/api/transactions")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(NEW_TRANSACTION_JSON))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/test/reset"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/transactions")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(10)));
    }
}
