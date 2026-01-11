package com.ikeda.kakeibo.dto.request;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncomeExpenseRequest {
    private int typeId;
    private int price;
    private LocalDate accountingDate;
    // serviceクラスでsettlementDateがnullのときはaccountingDateの値をコピーする
    private LocalDate settlementDate; // null可
    private int categoryId;
    private String memo; // null可
}
