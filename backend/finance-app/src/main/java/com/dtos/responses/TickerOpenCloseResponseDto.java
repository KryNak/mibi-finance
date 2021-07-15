package com.dtos.responses;

import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

@Data
public class TickerOpenCloseResponseDto {

    private String status;
    private LocalDate from;
    private String symbol;
    private BigDecimal open;
    private BigDecimal high;
    private BigDecimal low;
    private BigDecimal close;
    private BigInteger volume;
    private BigDecimal afterHours;
    private BigDecimal preMarket;

}
