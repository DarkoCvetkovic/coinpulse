package com.coinpulse.backend.controller;

import com.coinpulse.backend.dto.WatchlistRequest;
import com.coinpulse.backend.exception.ConflictException;
import com.coinpulse.backend.exception.NotFoundException;
import com.coinpulse.backend.model.Coin;
import com.coinpulse.backend.model.User;
import com.coinpulse.backend.model.WatchlistItem;
import com.coinpulse.backend.repository.CoinRepository;
import com.coinpulse.backend.repository.UserRepository;
import com.coinpulse.backend.repository.WatchlistRepository;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
@Tag(name = "Watchlist", description = "Watchlist of the authenticated user")
public class WatchlistController {

    private final WatchlistRepository watchlistRepository;
    private final CoinRepository coinRepository;
    private final UserRepository userRepository;

    public WatchlistController(WatchlistRepository watchlistRepository,
                               CoinRepository coinRepository,
                               UserRepository userRepository) {
        this.watchlistRepository = watchlistRepository;
        this.coinRepository = coinRepository;
        this.userRepository = userRepository;
    }

    @Operation(summary = "List watchlist items of the authenticated user")
    @GetMapping
    public List<WatchlistItem> list(Authentication authentication) {
        return watchlistRepository.findByUserUsernameOrderByIdAsc(authentication.getName());
    }

    @Operation(summary = "Add a coin to the watchlist (409 if already present)")
    @PostMapping
    public ResponseEntity<WatchlistItem> add(@Valid @RequestBody WatchlistRequest request,
                                             Authentication authentication) {
        Coin coin = coinRepository.findById(request.coinId())
                .orElseThrow(() -> new NotFoundException("Coin with id " + request.coinId() + " not found"));
        if (watchlistRepository.existsByUserUsernameAndCoinId(authentication.getName(), coin.getId())) {
            throw new ConflictException("Coin " + coin.getSymbol() + " is already on the watchlist");
        }
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new NotFoundException("User " + authentication.getName() + " not found"));

        WatchlistItem item = new WatchlistItem();
        item.setUser(user);
        item.setCoin(coin);
        return ResponseEntity.status(HttpStatus.CREATED).body(watchlistRepository.save(item));
    }

    @Operation(summary = "Remove a coin from the watchlist")
    @DeleteMapping("/{coinId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long coinId, Authentication authentication) {
        WatchlistItem item = watchlistRepository
                .findByUserUsernameAndCoinId(authentication.getName(), coinId)
                .orElseThrow(() -> new NotFoundException("Coin with id " + coinId + " is not on the watchlist"));
        watchlistRepository.delete(item);
    }
}
