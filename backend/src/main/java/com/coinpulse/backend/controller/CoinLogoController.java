package com.coinpulse.backend.controller;

import com.coinpulse.backend.exception.NotFoundException;
import com.coinpulse.backend.model.Coin;
import com.coinpulse.backend.repository.CoinRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Set;

@RestController
@RequestMapping("/api/coins/{coinId}/logo")
@Tag(name = "Coin logo", description = "Upload and serve coin logo images")
public class CoinLogoController {

    private static final long MAX_BYTES = 1_000_000;
    private static final Set<String> ALLOWED_TYPES =
            Set.of(MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE, "image/svg+xml", "image/webp");

    private final CoinRepository coinRepository;

    public CoinLogoController(CoinRepository coinRepository) {
        this.coinRepository = coinRepository;
    }

    @Operation(summary = "Upload a logo image for a coin (admin only, max 1 MB, png/jpeg/svg/webp)")
    @PostMapping
    public Coin upload(@PathVariable Long coinId, @RequestParam("file") MultipartFile file)
            throws IOException {
        Coin coin = findCoin(coinId);
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "File is required");
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY,
                    "File must be a png, jpeg, svg or webp image");
        }
        if (file.getSize() > MAX_BYTES) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY,
                    "File must be at most 1 MB");
        }
        coin.setLogoData(file.getBytes());
        coin.setLogoContentType(file.getContentType());
        coin.setLogoUrl("/api/coins/" + coinId + "/logo");
        return coinRepository.save(coin);
    }

    @Operation(summary = "Serve the uploaded logo image of a coin")
    @GetMapping
    public ResponseEntity<byte[]> serve(@PathVariable Long coinId) {
        Coin coin = findCoin(coinId);
        if (coin.getLogoData() == null) {
            throw new NotFoundException("Coin " + coinId + " has no uploaded logo");
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(coin.getLogoContentType()))
                .body(coin.getLogoData());
    }

    private Coin findCoin(Long coinId) {
        return coinRepository.findById(coinId)
                .orElseThrow(() -> new NotFoundException("Coin with id " + coinId + " not found"));
    }
}
