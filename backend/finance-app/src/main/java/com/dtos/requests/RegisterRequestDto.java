package com.dtos.requests;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.Length;
import com.validations.constraints.PasswordsOverlapping;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@PasswordsOverlapping(message = "Password and password repetition should be the same.")
public class RegisterRequestDto {

    @Length(min = 2, message = "Username should have at least 2 characters")
    @NotNull(message = "Username shouldn't be empty.")
    private String username;

    @Length(min = 8, message = "Password should have at least 8 characters.")
    @NotNull(message = "Password shouldn't be empty.")
    private String password;

    @Length(min = 8, message = "Password repetition should have at least 8 characters.")
    @NotNull(message = "Password repetition shouldn't be empty.")
    private String passwordRepetition;

    @Email(message = "Required proper email address.")
    @NotNull(message = "Email shouldn't be empty.")
    private String email;

}
