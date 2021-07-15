package com.dtos.responses;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
public class NotValidExceptionResponseDto {

    private String title;
    private int status;
    private List<LabelAndError> errors;

    public NotValidExceptionResponseDto(BindingResult bindingResult, int statusCode){
        title = "One or more validation errors occurred.";
        status = statusCode;
        errors = getErrors(bindingResult);
    }

    private List<LabelAndError> getErrors(BindingResult bindingResult){

        List<LabelAndError> result = new ArrayList<>();
        for(ObjectError objectError : bindingResult.getAllErrors()){

            LabelAndError labelAndError = Optional.of(objectError)
                    .filter(e -> e instanceof FieldError)
                    .map(e -> ((FieldError) e))
                    .map(e -> new LabelAndError(e.getField(), e.getDefaultMessage()))
                    .orElseGet(() -> new LabelAndError(objectError.getObjectName(), objectError.getDefaultMessage()));

            result.add(labelAndError);
        }

        return result;
    }

    @Data
    @RequiredArgsConstructor
    private static class LabelAndError {
        private final String field;
        private final String error;
    }

}
