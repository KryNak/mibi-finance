package com.helpers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Slf4j
public class RestTemplateUtils {

    private RestTemplate restTemplate;

    public static RestTemplateUtils of(RestTemplate restTemplate) {
        return new RestTemplateUtils(restTemplate);
    }

    private RestTemplateUtils(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public<T> Optional<ResponseEntity<T>> getOptionalForEntity(String url, Class<T> responseType, Object... uriVariables){

        try{
            return Optional.of(restTemplate.getForEntity(url, responseType, uriVariables));
        }catch (Exception ex){
            log.info(ex.getMessage());
            return Optional.empty();
        }

    }

    public<T> Optional<T> getOptionalForObject(String url, Class<T> responseType, Object... uriVariables){

        try{
            return Optional.ofNullable(restTemplate.getForObject(url, responseType, uriVariables));
        }catch (Exception ex){
            log.info(ex.getMessage());
            return Optional.empty();
        }

    }

}
