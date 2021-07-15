package com.controllers;

import com.dtos.responses.TickerAggregationResponseDto;
import com.dtos.responses.TickerDetailResponseDto;
import com.dtos.responses.TickerOpenCloseResponseDto;
import com.helpers.Timespan;
import com.services.TickersService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin
@RestController
@RequestMapping("/api/tickers")
@RequiredArgsConstructor
public class TickersController {

    private final TickersService tickersService;

    @GetMapping("/{ticker}/details")
    public ResponseEntity<TickerDetailResponseDto> getTickerDetail(@PathVariable String ticker) {
        return tickersService
                .getTickerDetails(ticker)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/{ticker}/open-close/{date}")
    public ResponseEntity<TickerOpenCloseResponseDto> getTickerOpenClose(@PathVariable String ticker, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return tickersService
                .getTickerOpenClose(ticker, date)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));

    }

    @GetMapping("/{ticker}/range/{multiplier}/{timespan}/{from}/{to}")
    public ResponseEntity<TickerAggregationResponseDto> getTickerAggregation(
            @PathVariable String ticker, @PathVariable Integer multiplier, @PathVariable Timespan timespan,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate from, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate to
    ) {

        return tickersService
                .getTickerAggregation(ticker, multiplier, timespan, from, to)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));

    }


}
