package com.ikeda.kakeibo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ikeda.kakeibo.entity.IncomeExpense;

public interface IncomeExpenseRepository extends JpaRepository<IncomeExpense, Integer> {
}