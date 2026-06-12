package com.coinpulse.backend;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class FilesApiTest extends BaseApiTest {

    private static final byte[] PNG_BYTES = {(byte) 0x89, 'P', 'N', 'G', 0, 1, 2, 3};

    @Test
    @DisplayName("Admin can upload a coin logo and it is served back")
    void uploadAndServeLogo() throws Exception {
        String token = loginToken("admin", "Admin123!");
        MockMultipartFile file = new MockMultipartFile("file", "logo.png", "image/png", PNG_BYTES);

        mockMvc.perform(multipart("/api/coins/1/logo").file(file)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.logoUrl").value("/api/coins/1/logo"));

        mockMvc.perform(get("/api/coins/1/logo")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Type", "image/png"))
                .andExpect(content().bytes(PNG_BYTES));
    }

    @Test
    @DisplayName("Logo upload as a regular user returns 403")
    void uploadForbiddenForRegularUser() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        MockMultipartFile file = new MockMultipartFile("file", "logo.png", "image/png", PNG_BYTES);

        mockMvc.perform(multipart("/api/coins/1/logo").file(file)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Logo upload with a non-image file returns 422")
    void uploadWrongTypeReturnsValidationError() throws Exception {
        String token = loginToken("admin", "Admin123!");
        MockMultipartFile file =
                new MockMultipartFile("file", "notes.txt", "text/plain", "hello".getBytes());

        mockMvc.perform(multipart("/api/coins/1/logo").file(file)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isUnprocessableEntity());
    }

    @Test
    @DisplayName("Serving a logo that was never uploaded returns 404")
    void serveMissingLogoReturnsNotFound() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/coins/2/logo")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("CSV export downloads the user's transactions")
    void exportCsv() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/portfolio/export?format=csv")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Disposition", containsString("portfolio.csv")))
                .andExpect(content().string(startsWith("id,coin,symbol,type,amount,price,date,note")))
                .andExpect(content().string(containsString("Bitcoin")));
    }

    @Test
    @DisplayName("JSON export downloads the user's transactions")
    void exportJson() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/portfolio/export?format=json")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Disposition", containsString("portfolio.json")))
                .andExpect(jsonPath("$[0].coin.symbol").exists());
    }

    @Test
    @DisplayName("Export with an unknown format returns 422")
    void exportUnknownFormatReturnsValidationError() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/portfolio/export?format=xml")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isUnprocessableEntity());
    }
}
