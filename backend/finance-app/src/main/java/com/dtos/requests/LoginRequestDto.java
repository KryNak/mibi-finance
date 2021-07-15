package com.dtos.requests;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

@Data
public class LoginRequestDto {

    @Length(min = 2, message = "Login should have at least 2 characters.")
    @NotNull(message = "Login shouldn't be empty.")
    private String username;

    @Length(min = 8, message = "Password should have at least 8 characters.")
    @NotNull(message = "Password shouldn't be empty.")
    private String password;

}
