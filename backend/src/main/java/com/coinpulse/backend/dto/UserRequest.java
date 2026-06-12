package com.coinpulse.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserRequest(
        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50, message = "Username must be 3-50 characters")
        String username,
        // Required on create, optional on update (blank keeps the current password)
        String password,
        @NotBlank(message = "Role is required")
        @Pattern(regexp = "USER|ADMIN", message = "Role must be 'USER' or 'ADMIN'")
        String role,
        boolean locked) {
}
