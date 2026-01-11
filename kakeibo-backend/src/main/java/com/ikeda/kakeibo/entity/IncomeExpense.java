package com.ikeda.kakeibo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "income_expense")
@Getter
@Setter
public class IncomeExpense {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "type_id", nullable = false)
	private int typeId;
	
	@Column(name = "price", nullable = false)
	private int price;
	
	@Column(name = "accounting_date", nullable = false)
	private LocalDate accountingDate;
	
	@Column(name = "settlement_date", nullable = false)
	private LocalDate settlementDate;
	
	@Column(name = "last_update_at", nullable = false)
	private LocalDateTime lastUpdateAt;
	
	@Column(name = "category_id", nullable = false)
	private int categoryId;
	
	@Column(name = "memo")
	private String memo;
}
