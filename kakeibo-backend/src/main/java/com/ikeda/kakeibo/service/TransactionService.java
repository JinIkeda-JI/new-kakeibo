package com.ikeda.kakeibo.service;

import java.util.List;

import com.ikeda.kakeibo.entity.Transaction;
import com.ikeda.kakeibo.repository.TransactionRepository;

public class TransactionService {
    private final TransactionRepository repo;

    public TransactionService(TransactionRepository repo) {
        this.repo = repo;
    }

    public List<Transaction> list() {
       return repo.findAll();
    }
}
