package com.ikeda.kakeibo.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncomeExpenseRequest {
    @NotNull(message = "typeId is required")
    private int typeId;
    
    @PositiveOrZero(message = "price must be zero or positive")
    private int price;
    
    @NotNull(message = "accountingDate is required")
    private LocalDate accountingDate;
    
    // serviceクラスでsettlementDateがnullのときはaccountingDateの値をコピーする
    private LocalDate settlementDate; // null可
    
    @NotNull(message = "categoryId is required")
    @Positive(message = "categoryId must be positive")
    private int categoryId;
    
    private String memo; // null可
}
