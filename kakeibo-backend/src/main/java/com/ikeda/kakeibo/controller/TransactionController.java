package com.ikeda.kakeibo.controller;

import com.ikeda.kakeibo.entity.Transaction;
import com.ikeda.kakeibo.repository.TransactionRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

	private final TransactionRepository repo;
	
	public TransactionController(TransactionRepository repo) {
		this.repo = repo;
	}
	
    @GetMapping
    public List<Transaction> list() {
       return repo.findAll();
    }
}
