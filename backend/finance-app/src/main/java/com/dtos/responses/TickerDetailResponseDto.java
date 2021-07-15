package com.dtos.responses;

import lombok.Data;

import java.math.BigInteger;
import java.util.List;

@Data
public class TickerDetailResponseDto {

    private String logo;
    private String listdate;
    private String clik;
    private String bloomberg;
    private String figi;
    private String lei;
    private BigInteger sic;
    private String country;
    private String industry;
    private String sector;
    private BigInteger marketcap;
    private BigInteger employees;
    private String phone;
    private String ceo;
    private String url;
    private String description;
    private String name;
    private String symbol;
    private String exchangeSymbol;
    private String hq_adress;
    private String hq_state;
    private String hq_country;
    private String type;
    private String updated;
    private List<String> tags;
    private List<String> similar;
    private Boolean active;

}
