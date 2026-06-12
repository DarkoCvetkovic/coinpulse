package com.coinpulse.backend.controller;

import com.coinpulse.backend.model.Transaction;
import com.coinpulse.backend.repository.TransactionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@Tag(name = "Portfolio", description = "Portfolio report export for the authenticated user")
public class PortfolioController {

    private final TransactionRepository transactionRepository;

    public PortfolioController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Operation(summary = "Download the user's transactions as csv or json")
    @GetMapping("/export")
    public ResponseEntity<?> export(@RequestParam(defaultValue = "csv") String format,
                                    Authentication authentication) {
        List<Transaction> transactions =
                transactionRepository.findByUserUsernameOrderByDateDesc(authentication.getName());

        if ("json".equalsIgnoreCase(format)) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"portfolio.json\"")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(transactions);
        }
        if ("csv".equalsIgnoreCase(format)) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"portfolio.csv\"")
                    .contentType(MediaType.parseMediaType("text/csv"))
                    .body(toCsv(transactions));
        }
        throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY,
                "Format must be 'csv' or 'json'");
    }

    private String toCsv(List<Transaction> transactions) {
        StringBuilder csv = new StringBuilder("id,coin,symbol,type,amount,price,date,note\n");
        for (Transaction tx : transactions) {
            csv.append(tx.getId()).append(',')
                    .append(escape(tx.getCoin().getName())).append(',')
                    .append(tx.getCoin().getSymbol()).append(',')
                    .append(tx.getType()).append(',')
                    .append(tx.getAmount().toPlainString()).append(',')
                    .append(tx.getPrice().toPlainString()).append(',')
                    .append(tx.getDate()).append(',')
                    .append(escape(tx.getNote())).append('\n');
        }
        return csv.toString();
    }

    private String escape(String value) {
        if (value == null) return "";
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            return '"' + value.replace("\"", "\"\"") + '"';
        }
        return value;
    }
}
