package com.dtos.responses;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class TickerAggregationResponseDto {

    private String ticker;
    private Integer queryCount;
    private Integer resultsCount;
    private Boolean adjusted;
    private String status;
    private String request_id;
    private Integer count;
    private List<Result> results;

    @Data
    private static class Result {

        private BigDecimal v;
        private BigDecimal vw;
        private BigDecimal o;
        private BigDecimal c;
        private BigDecimal h;
        private BigDecimal l;
        private BigDecimal t;
        private BigDecimal n;

    }
}
