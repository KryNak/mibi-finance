package com.controllers;

import com.dtos.requests.LoginRequestDto;
import com.dtos.requests.RefreshRequestDto;
import com.dtos.requests.RegisterRequestDto;
import com.dtos.responses.LoginResponseDto;
import com.dtos.responses.RefreshResponseDto;
import com.models.User;
import com.services.AccountsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountsController {

    private final AccountsService accountsService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequestDto registerRequest) {
        return accountsService.register(registerRequest)
                .map(e -> new ResponseEntity<>(e, HttpStatus.CREATED))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequest) {
        return accountsService.authenticate(loginRequest)
                .map(e -> new ResponseEntity<>(e, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));

    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponseDto> refresh(@RequestHeader("Authorization") String accessToken, @Valid @RequestBody RefreshRequestDto refreshRequest) {
        return accountsService.refresh(accessToken, refreshRequest)
                .map(e -> new ResponseEntity<>(e, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

}
