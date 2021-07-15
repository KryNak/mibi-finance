package com.exceptions.handlers;

import com.dtos.responses.NotValidExceptionResponseDto;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ValidationExceptionHandler extends ResponseEntityExceptionHandler {

    @NotNull
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, @NotNull HttpHeaders headers, HttpStatus status, @NotNull WebRequest request) {
        BindingResult bindingErrors = ex.getBindingResult();
        int statusCode = status.value();
        NotValidExceptionResponseDto exceptionResponse = new NotValidExceptionResponseDto(bindingErrors, statusCode);

        return new ResponseEntity<>(exceptionResponse, status);
    }


}
