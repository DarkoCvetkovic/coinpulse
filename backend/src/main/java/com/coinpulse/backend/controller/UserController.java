package com.coinpulse.backend.controller;

import com.coinpulse.backend.dto.UserRequest;
import com.coinpulse.backend.exception.ConflictException;
import com.coinpulse.backend.exception.NotFoundException;
import com.coinpulse.backend.model.User;
import com.coinpulse.backend.repository.TransactionRepository;
import com.coinpulse.backend.repository.UserRepository;
import com.coinpulse.backend.repository.WatchlistRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "User management (admin only)")
public class UserController {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final WatchlistRepository watchlistRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository,
                          TransactionRepository transactionRepository,
                          WatchlistRepository watchlistRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.watchlistRepository = watchlistRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Operation(summary = "List all users")
    @GetMapping
    public List<User> list() {
        return userRepository.findAll();
    }

    @Operation(summary = "Get a single user")
    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return findUser(id);
    }

    @Operation(summary = "Create a user (409 if the username is taken)")
    @PostMapping
    public ResponseEntity<User> create(@Valid @RequestBody UserRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new ConflictException("Username " + request.username() + " is already taken");
        }
        if (request.password() == null || request.password().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Password is required");
        }
        User user = new User(request.username(), passwordEncoder.encode(request.password()),
                request.role(), request.locked());
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(user));
    }

    @Operation(summary = "Update a user (blank password keeps the current one)")
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @Valid @RequestBody UserRequest request) {
        User user = findUser(id);
        userRepository.findByUsername(request.username())
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new ConflictException("Username " + request.username() + " is already taken");
                });
        user.setUsername(request.username());
        user.setRole(request.role());
        user.setLocked(request.locked());
        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }
        return userRepository.save(user);
    }

    @Operation(summary = "Delete a user and their data (409 when deleting yourself)")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void delete(@PathVariable Long id, Authentication authentication) {
        User user = findUser(id);
        if (user.getUsername().equals(authentication.getName())) {
            throw new ConflictException("You cannot delete your own account");
        }
        transactionRepository.deleteByUserId(id);
        watchlistRepository.deleteByUserId(id);
        userRepository.delete(user);
    }

    private User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User with id " + id + " not found"));
    }
}
