package com.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RefreshResponseDto {

    private String accessToken;
    private String refreshToken;

}
