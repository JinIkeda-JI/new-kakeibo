package com.ikeda.kakeibo.dto;

import java.time.LocalDate;

public record TransactionDto(
        long id,
        LocalDate occurredOn,
        int amount,
        String category,
        String memo
) {}
