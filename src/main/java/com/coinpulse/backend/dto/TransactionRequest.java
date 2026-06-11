package com.coinpulse.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(
        @NotNull(message = "Coin id is required") Long coinId,
        @NotBlank(message = "Type is required")
        @Pattern(regexp = "buy|sell", message = "Type must be 'buy' or 'sell'") String type,
        @NotNull(message = "Amount is required")
        @Positive(message = "Amount must be positive") BigDecimal amount,
        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive") BigDecimal price,
        @NotNull(message = "Date is required") LocalDate date,
        @Size(max = 255, message = "Note must be at most 255 characters") String note) {
}
