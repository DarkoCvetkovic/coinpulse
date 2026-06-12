package com.coinpulse.backend.repository;

import com.coinpulse.backend.model.WatchlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WatchlistRepository extends JpaRepository<WatchlistItem, Long> {

    List<WatchlistItem> findByUserUsernameOrderByIdAsc(String username);

    Optional<WatchlistItem> findByUserUsernameAndCoinId(String username, Long coinId);

    boolean existsByUserUsernameAndCoinId(String username, Long coinId);

    void deleteByUserId(Long userId);
}
