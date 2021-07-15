package com.validations.validators;

import com.dtos.requests.RegisterRequestDto;
import com.validations.constraints.PasswordsOverlapping;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordOverlappingValidator implements ConstraintValidator<PasswordsOverlapping, RegisterRequestDto> {

    @Override
    public boolean isValid(RegisterRequestDto registerRequestDto, ConstraintValidatorContext constraintValidatorContext) {
        return registerRequestDto.getPassword().equals(registerRequestDto.getPasswordRepetition());
    }

}
