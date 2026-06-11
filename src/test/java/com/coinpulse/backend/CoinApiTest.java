package com.coinpulse.backend;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class CoinApiTest extends BaseApiTest {

    private static final String NEW_COIN_JSON = """
            {
              "name": "Testcoin",
              "symbol": "TST",
              "price": 1.23,
              "marketCap": 1000000,
              "change24h": 0.5,
              "rank": 99,
              "category": "DeFi",
              "launchDate": "2024-01-01",
              "status": "active",
              "description": "Coin created by an automated test",
              "logoUrl": "/logos/tst.png"
            }""";

    @Test
    @DisplayName("GET /api/coins without a token returns 401")
    void listWithoutToken() throws Exception {
        mockMvc.perform(get("/api/coins"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/coins returns the seeded page sorted by rank")
    void listSeededCoins() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/coins")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page.totalElements").value(20))
                .andExpect(jsonPath("$.content[0].symbol").value("BTC"))
                .andExpect(jsonPath("$.content[0].rank").value(1));
    }

    @Test
    @DisplayName("Search and filters narrow down the coin list")
    void searchAndFilter() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/coins").param("search", "bitcoin")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].symbol").value("BTC"));

        mockMvc.perform(get("/api/coins").param("category", "meme")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page.totalElements").value(2));

        mockMvc.perform(get("/api/coins").param("status", "delisted")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.page.totalElements").value(2));

        mockMvc.perform(get("/api/coins").param("sort", "price,desc")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].symbol").value("BTC"));
    }

    @Test
    @DisplayName("Unsupported sort property returns 400")
    void invalidSortProperty() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/coins").param("sort", "hack,asc")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Standard user cannot create coins (403)")
    void createAsStandardUserForbidden() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(post("/api/coins")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(NEW_COIN_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Admin can create, update and delete a coin")
    void adminCrudCycle() throws Exception {
        String token = loginToken("admin", "Admin123!");

        String body = mockMvc.perform(post("/api/coins")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(NEW_COIN_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.symbol").value("TST"))
                .andReturn().getResponse().getContentAsString();
        long id = objectMapper.readTree(body).get("id").asLong();

        mockMvc.perform(put("/api/coins/" + id)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(NEW_COIN_JSON.replace("\"price\": 1.23", "\"price\": 9.99")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.price").value(9.99));

        mockMvc.perform(delete("/api/coins/" + id)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/coins/" + id)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Creating a coin with invalid data returns 422 with field errors")
    void createInvalidCoin() throws Exception {
        String token = loginToken("admin", "Admin123!");
        mockMvc.perform(post("/api/coins")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"\",\"symbol\":\"bad symbol\",\"price\":-1,\"category\":\"\",\"status\":\"unknown\"}"))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.errors.name").exists())
                .andExpect(jsonPath("$.errors.symbol").exists())
                .andExpect(jsonPath("$.errors.price").exists())
                .andExpect(jsonPath("$.errors.status").exists());
    }
}
