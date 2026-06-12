package com.coinpulse.backend.dto;

import jakarta.validation.constraints.NotNull;

public record WatchlistRequest(
        @NotNull(message = "Coin id is required")
        Long coinId) {
}
