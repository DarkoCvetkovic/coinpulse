package com.coinpulse.backend;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class UserApiTest extends BaseApiTest {

    @Test
    @DisplayName("GET /api/users as a regular user returns 403")
    void listForbiddenForRegularUser() throws Exception {
        String token = loginToken("standard_user", "Test123!");
        mockMvc.perform(get("/api/users").header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("GET /api/users as admin returns the seeded users without passwords")
    void listAsAdmin() throws Exception {
        String token = loginToken("admin", "Admin123!");
        mockMvc.perform(get("/api/users").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].username").value("standard_user"))
                .andExpect(jsonPath("$[0].password").doesNotExist());
    }

    @Test
    @DisplayName("POST /api/users creates a user that can immediately log in")
    void createUser() throws Exception {
        String token = loginToken("admin", "Admin123!");
        mockMvc.perform(post("/api/users")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"new_user\",\"password\":\"Test123!\",\"role\":\"USER\",\"locked\":false}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("new_user"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"new_user\",\"password\":\"Test123!\"}"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("POST /api/users with a taken username returns 409")
    void createDuplicateReturnsConflict() throws Exception {
        String token = loginToken("admin", "Admin123!");
        mockMvc.perform(post("/api/users")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"standard_user\",\"password\":\"x12345\",\"role\":\"USER\",\"locked\":false}"))
                .andExpect(status().isConflict());
    }

    @Test
    @DisplayName("POST /api/users without a password returns 422")
    void createWithoutPasswordReturnsValidationError() throws Exception {
        String token = loginToken("admin", "Admin123!");
        mockMvc.perform(post("/api/users")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"no_pass_user\",\"role\":\"USER\",\"locked\":false}"))
                .andExpect(status().isUnprocessableEntity());
    }

    @Test
    @DisplayName("PUT /api/users/{id} can lock an account, which then cannot log in")
    void updateLocksAccount() throws Exception {
        String token = loginToken("admin", "Admin123!");
        mockMvc.perform(put("/api/users/1")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"standard_user\",\"role\":\"USER\",\"locked\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.locked").value(true));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"standard_user\",\"password\":\"Test123!\"}"))
                .andExpect(status().isLocked());
    }

    @Test
    @DisplayName("DELETE /api/users/{id} removes the user together with their data")
    void deleteUserWithData() throws Exception {
        String token = loginToken("admin", "Admin123!");
        mockMvc.perform(delete("/api/users/1").header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/users").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    @DisplayName("DELETE on your own account returns 409")
    void deleteSelfReturnsConflict() throws Exception {
        String token = loginToken("admin", "Admin123!");
        mockMvc.perform(delete("/api/users/3").header("Authorization", "Bearer " + token))
                .andExpect(status().isConflict());
    }
}
