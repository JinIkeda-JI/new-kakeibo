package com.ikeda.kakeibo.controller;

import com.ikeda.kakeibo.entity.Transaction;
import com.ikeda.kakeibo.service.TransactionService;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
	private final TransactionService service;

	public TransactionController(TransactionService service) {
        this.service = service;
	}
	
    @GetMapping
    public List<Transaction> list() {
        return service.list();
    }
}
