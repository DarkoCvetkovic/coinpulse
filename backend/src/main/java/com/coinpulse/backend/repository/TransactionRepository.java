package com.coinpulse.backend.repository;

import com.coinpulse.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserUsernameOrderByDateDesc(String username);

    Optional<Transaction> findByIdAndUserUsername(Long id, String username);

    void deleteByUserId(Long userId);
}
