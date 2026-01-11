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
	
	public IncomeExpenseDto(IncomeExpense ie) {
		this.id = ie.getId();
		this.typeId = ie.getTypeId();
		this.price = ie.getPrice();
		this.accountingDate = ie.getAccountingDate();
		this.settlementDate = ie.getSettlementDate();
		this.lastUpdateAt = ie.getLastUpdateAt();
		this.categoryId = ie.getCategoryId();
		this.memo = ie.getMemo();
	}
}
