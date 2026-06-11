package com.coinpulse.backend.repository;

import com.coinpulse.backend.model.Coin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CoinRepository extends JpaRepository<Coin, Long>, JpaSpecificationExecutor<Coin> {
}
