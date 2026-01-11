package com.ikeda.kakeibo.repository;

import com.ikeda.kakeibo.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {}
