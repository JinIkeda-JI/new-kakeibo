package com.ikeda.kakeibo.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.ikeda.kakeibo.entity.IncomeExpense;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncomeExpenseDto {
	private int id;
	private int typeId;
	private int price;
	private LocalDate accountingDate;
	private LocalDate settlementDate;
	private LocalDateTime lastUpdateAt;
	private int categoryId;
	private String memo;
	
	public IncomeExpenseDto(IncomeExpense e) {
		this.id = e.getId();
		this.typeId = e.getTypeId();
		this.price = e.getPrice();
		this.accountingDate = e.getAccountingDate();
		this.settlementDate = e.getSettlementDate();
		this.lastUpdateAt = e.getLastUpdateAt();
		this.categoryId = e.getCategoryId();
		this.memo = e.getMemo();
	}
}
