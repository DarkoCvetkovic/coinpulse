package com.coinpulse.backend.controller;

import com.coinpulse.backend.dto.LoginRequest;
import com.coinpulse.backend.dto.LoginResponse;
import com.coinpulse.backend.model.User;
import com.coinpulse.backend.repository.UserRepository;
import com.coinpulse.backend.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "JWT authentication")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Operation(summary = "Log in and receive a JWT token",
            description = "Returns 401 for invalid credentials, 423 for a locked account.")
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.username()).orElse(null);
        if (user == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", 401, "message", "Invalid username or password"));
        }
        if (user.isLocked()) {
            return ResponseEntity.status(HttpStatus.LOCKED)
                    .body(Map.of("status", 423, "message", "Sorry, this account has been locked out"));
        }
        String token = jwtService.generateToken(user.getUsername(), user.getRole());
        return ResponseEntity.ok(new LoginResponse(token, user.getUsername(), user.getRole()));
    }

    @Operation(summary = "Log out",
            description = "Stateless JWT: the client discards the token. Endpoint exists for UI symmetry.")
    @PostMapping("/logout")
    public Map<String, String> logout() {
        return Map.of("message", "Logged out");
    }
}
