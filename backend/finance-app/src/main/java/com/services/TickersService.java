package com.services;

import com.dtos.responses.TickerAggregationResponseDto;
import com.dtos.responses.TickerDetailResponseDto;
import com.dtos.responses.TickerOpenCloseResponseDto;
import com.helpers.RestTemplateUtils;
import com.helpers.Timespan;
import com.properties.PolygonApiKeyProperty;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class TickersService {

    private final RestTemplate restTemplate;
    private final String apiKey;

    public TickersService(RestTemplate restTemplate, PolygonApiKeyProperty polygonApiKeyProperty){
        this.restTemplate = restTemplate;
        this.apiKey = polygonApiKeyProperty.getApiKey();
    }

    private static final String POLYGON_DETAILS_URL = "https://api.polygon.io/v1/meta/symbols/{ticker}/company?&apiKey={apiKey}";

    public Optional<ResponseEntity<TickerDetailResponseDto>> getTickerDetails(String ticker) {
        return RestTemplateUtils
                .of(restTemplate)
                .getOptionalForEntity(POLYGON_DETAILS_URL, TickerDetailResponseDto.class, ticker, apiKey);
    }

    private static final String POLYGON_DAILY_OPEN_CLOSE_URL = "https://api.polygon.io/v1/open-close/{ticker}/{date}?&apiKey={apiKey}";

    public Optional<ResponseEntity<TickerOpenCloseResponseDto>> getTickerOpenClose(String ticker, LocalDate date) {
        return RestTemplateUtils
                .of(restTemplate)
                .getOptionalForEntity(POLYGON_DAILY_OPEN_CLOSE_URL, TickerOpenCloseResponseDto.class, ticker, date, apiKey);
    }

    private static final String POLYGON_AGGREGATION_URL = "https://api.polygon.io/v2/aggs/ticker/{ticker}/range/{multiplier}/{timespan}/{from}/{to}?&apiKey={apiKey}";

    public Optional<ResponseEntity<TickerAggregationResponseDto>> getTickerAggregation(String ticker, Integer multiplier, Timespan timespan, LocalDate from, LocalDate to) {
        return RestTemplateUtils
                .of(restTemplate)
                .getOptionalForObject(POLYGON_AGGREGATION_URL, TickerAggregationResponseDto.class, ticker, multiplier, timespan, from, to, apiKey)
                .map(responseObject -> new ResponseEntity<>(responseObject, HttpStatus.OK));
    }


}
