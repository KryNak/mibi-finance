package com.dtos.requests;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RefreshRequestDto {

    @NotNull(message = "RefreshToken shouldn't be empty")
    private String refreshToken;

}
