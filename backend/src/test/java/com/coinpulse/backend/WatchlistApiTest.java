package com.coinpulse.backend;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class WatchlistApiTest extends BaseApiTest {

    @Test
    @DisplayName("GET /api/watchlist without a token returns 401")
    void listRequiresAuthentication() throws Exception {
        mockMvc.perform(get("/api/watchlist"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/watchlist returns only the current user's seeded items")
    void listReturnsSeededItemsOfCurrentUser() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/watchlist").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].coin.symbol").value("BTC"));
    }

    @Test
    @DisplayName("Watchlists are isolated per user")
    void listIsIsolatedPerUser() throws Exception {
        String token = loginToken("admin", "Admin123!");
        mockMvc.perform(get("/api/watchlist").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].coin.symbol").value("ETH"));
    }

    @Test
    @DisplayName("POST /api/watchlist adds a coin and it shows up in the list")
    void addCoin() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(post("/api/watchlist")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"coinId\":9}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.coin.symbol").value("DOGE"));

        mockMvc.perform(get("/api/watchlist").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(5)));
    }

    @Test
    @DisplayName("POST /api/watchlist with a coin already on the list returns 409")
    void addDuplicateReturnsConflict() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(post("/api/watchlist")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"coinId\":1}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409));
    }

    @Test
    @DisplayName("POST /api/watchlist with an unknown coin returns 404")
    void addUnknownCoinReturnsNotFound() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(post("/api/watchlist")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"coinId\":999}"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/watchlist without coinId returns 422")
    void addWithoutCoinIdReturnsValidationError() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(post("/api/watchlist")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.errors.coinId").value("Coin id is required"));
    }

    @Test
    @DisplayName("DELETE /api/watchlist/{coinId} removes the coin from the list")
    void removeCoin() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(delete("/api/watchlist/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/watchlist").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));
    }

    @Test
    @DisplayName("DELETE /api/watchlist/{coinId} for a coin not on the list returns 404")
    void removeMissingCoinReturnsNotFound() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(delete("/api/watchlist/20").header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }
}
