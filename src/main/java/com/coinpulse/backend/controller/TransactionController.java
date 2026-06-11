package com.coinpulse.backend.controller;

import com.coinpulse.backend.dto.TransactionRequest;
import com.coinpulse.backend.exception.NotFoundException;
import com.coinpulse.backend.model.Coin;
import com.coinpulse.backend.model.Transaction;
import com.coinpulse.backend.model.User;
import com.coinpulse.backend.repository.CoinRepository;
import com.coinpulse.backend.repository.TransactionRepository;
import com.coinpulse.backend.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@Tag(name = "Transactions", description = "Buy/sell transactions of the authenticated user (portfolio)")
public class TransactionController {

    private final TransactionRepository transactionRepository;
    private final CoinRepository coinRepository;
    private final UserRepository userRepository;

    public TransactionController(TransactionRepository transactionRepository,
                                 CoinRepository coinRepository,
                                 UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.coinRepository = coinRepository;
        this.userRepository = userRepository;
    }

    @Operation(summary = "List transactions of the authenticated user, newest first")
    @GetMapping
    public List<Transaction> list(Authentication authentication) {
        return transactionRepository.findByUserUsernameOrderByDateDesc(authentication.getName());
    }

    @Operation(summary = "Get a single transaction of the authenticated user")
    @GetMapping("/{id}")
    public Transaction get(@PathVariable Long id, Authentication authentication) {
        return findOwned(id, authentication);
    }

    @Operation(summary = "Create a buy/sell transaction")
    @PostMapping
    public ResponseEntity<Transaction> create(@Valid @RequestBody TransactionRequest request,
                                              Authentication authentication) {
        Transaction transaction = new Transaction();
        transaction.setUser(currentUser(authentication));
        applyRequest(transaction, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(transactionRepository.save(transaction));
    }

    @Operation(summary = "Update a transaction of the authenticated user")
    @PutMapping("/{id}")
    public Transaction update(@PathVariable Long id, @Valid @RequestBody TransactionRequest request,
                              Authentication authentication) {
        Transaction transaction = findOwned(id, authentication);
        applyRequest(transaction, request);
        return transactionRepository.save(transaction);
    }

    @Operation(summary = "Delete a transaction of the authenticated user")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, Authentication authentication) {
        transactionRepository.delete(findOwned(id, authentication));
    }

    private Transaction findOwned(Long id, Authentication authentication) {
        return transactionRepository.findByIdAndUserUsername(id, authentication.getName())
                .orElseThrow(() -> new NotFoundException("Transaction with id " + id + " not found"));
    }

    private User currentUser(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User " + authentication.getName() + " not found"));
    }

    private void applyRequest(Transaction transaction, TransactionRequest request) {
        Coin coin = coinRepository.findById(request.coinId())
                .orElseThrow(() -> new NotFoundException("Coin with id " + request.coinId() + " not found"));
        transaction.setCoin(coin);
        transaction.setType(request.type());
        transaction.setAmount(request.amount());
        transaction.setPrice(request.price());
        transaction.setDate(request.date());
        transaction.setNote(request.note());
    }
}
