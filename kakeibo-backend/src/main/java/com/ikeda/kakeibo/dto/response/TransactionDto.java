package com.ikeda.kakeibo.dto.response;

import java.time.LocalDate;

public record TransactionDto(
        long id,
        LocalDate occurredOn,
        int amount,
        String category,
        String memo
) {}
