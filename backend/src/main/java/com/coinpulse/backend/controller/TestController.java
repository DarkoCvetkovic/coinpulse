package com.coinpulse.backend.controller;

import com.coinpulse.backend.config.DatabaseSeeder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.sql.SQLException;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@Tag(name = "Test utilities", description = "Endpoints that support automated testing: reset, slow and error simulation")
public class TestController {

    private static final long MAX_SLEEP_MS = 30_000;

    private final DatabaseSeeder databaseSeeder;
    private final JdbcTemplate jdbcTemplate;

    public TestController(DatabaseSeeder databaseSeeder, JdbcTemplate jdbcTemplate) {
        this.databaseSeeder = databaseSeeder;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Operation(summary = "Reset the database to its seed state (re-runs data.sql)")
    @PostMapping("/reset")
    public Map<String, String> reset() throws SQLException {
        jdbcTemplate.execute("DELETE FROM watchlist_items");
        jdbcTemplate.execute("DELETE FROM transactions");
        jdbcTemplate.execute("DELETE FROM coins");
        jdbcTemplate.execute("DELETE FROM users");
        databaseSeeder.seed();
        return Map.of("message", "Database reset to seed state");
    }

    @Operation(summary = "Respond after an artificial delay (default 3000 ms, max 30000 ms)")
    @GetMapping("/slow")
    public Map<String, Object> slow(@RequestParam(defaultValue = "3000") long ms) throws InterruptedException {
        long sleptMs = Math.min(Math.max(ms, 0), MAX_SLEEP_MS);
        Thread.sleep(sleptMs);
        return Map.of("message", "Slow response simulated", "sleptMs", sleptMs);
    }

    @Operation(summary = "Respond with the given HTTP error status (4xx/5xx, default 500)")
    @GetMapping("/error")
    public ResponseEntity<Map<String, Object>> error(@RequestParam(defaultValue = "500") int code) {
        int status = (code >= 400 && code <= 599) ? code : 500;
        return ResponseEntity.status(status)
                .body(Map.of("status", status, "message", "Simulated error response"));
    }
}
