package com.coinpulse.backend.controller;

import com.coinpulse.backend.exception.NotFoundException;
import com.coinpulse.backend.model.Coin;
import com.coinpulse.backend.repository.CoinRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

@RestController
@RequestMapping("/api/coins")
@Tag(name = "Coins", description = "Coin catalog: pagination, sorting, filtering, search; write operations are admin-only")
public class CoinController {

    private static final Set<String> SORTABLE_PROPERTIES =
            Set.of("rank", "price", "marketCap", "change24h", "name", "symbol", "launchDate");

    private final CoinRepository coinRepository;

    public CoinController(CoinRepository coinRepository) {
        this.coinRepository = coinRepository;
    }

    @Operation(summary = "List coins with pagination, sorting, filtering and search")
    @GetMapping
    public Page<Coin> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "rank,asc") String sort,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        Pageable pageable = PageRequest.of(page, size, parseSort(sort));
        return coinRepository.findAll(buildSpecification(category, status, search), pageable);
    }

    @Operation(summary = "Get a single coin by id")
    @GetMapping("/{id}")
    public Coin get(@PathVariable Long id) {
        return coinRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Coin with id " + id + " not found"));
    }

    @Operation(summary = "Create a coin (admin only)")
    @PostMapping
    public ResponseEntity<Coin> create(@Valid @RequestBody Coin coin) {
        coin.setId(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(coinRepository.save(coin));
    }

    @Operation(summary = "Update a coin (admin only)")
    @PutMapping("/{id}")
    public Coin update(@PathVariable Long id, @Valid @RequestBody Coin updated) {
        Coin coin = coinRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Coin with id " + id + " not found"));
        coin.setName(updated.getName());
        coin.setSymbol(updated.getSymbol());
        coin.setPrice(updated.getPrice());
        coin.setMarketCap(updated.getMarketCap());
        coin.setChange24h(updated.getChange24h());
        coin.setRank(updated.getRank());
        coin.setCategory(updated.getCategory());
        coin.setLaunchDate(updated.getLaunchDate());
        coin.setStatus(updated.getStatus());
        coin.setDescription(updated.getDescription());
        coin.setLogoUrl(updated.getLogoUrl());
        return coinRepository.save(coin);
    }

    @Operation(summary = "Delete a coin (admin only)")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!coinRepository.existsById(id)) {
            throw new NotFoundException("Coin with id " + id + " not found");
        }
        coinRepository.deleteById(id);
    }

    private static Sort parseSort(String sort) {
        String[] parts = sort.split(",");
        String property = parts[0].trim();
        if (!SORTABLE_PROPERTIES.contains(property)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Unsupported sort property '" + property + "'. Allowed: " + SORTABLE_PROPERTIES);
        }
        Sort.Direction direction = parts.length > 1 && "desc".equalsIgnoreCase(parts[1].trim())
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        return Sort.by(direction, property);
    }

    private static Specification<Coin> buildSpecification(String category, String status, String search) {
        Specification<Coin> spec = (root, query, cb) -> cb.conjunction();
        if (category != null && !category.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("category")), category.toLowerCase()));
        }
        if (status != null && !status.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("status")), status.toLowerCase()));
        }
        if (search != null && !search.isBlank()) {
            String pattern = "%" + search.toLowerCase() + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("name")), pattern),
                    cb.like(cb.lower(root.get("symbol")), pattern)));
        }
        return spec;
    }
}
