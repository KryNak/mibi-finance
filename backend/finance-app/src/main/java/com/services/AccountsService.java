package com.services;

import com.dtos.requests.LoginRequestDto;
import com.dtos.requests.RefreshRequestDto;
import com.dtos.requests.RegisterRequestDto;
import com.dtos.responses.LoginResponseDto;
import com.dtos.responses.RefreshResponseDto;
import com.google.common.base.Strings;
import com.helpers.SecurityHelpers;
import com.models.User;
import com.properties.SecretProperty;
import com.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountsService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecretProperty secretProperty;

    public Optional<LoginResponseDto> authenticate(LoginRequestDto loginRequest) {
        return usersRepository.findByUsername(loginRequest.getUsername())
                .filter(e -> passwordEncoder.matches(loginRequest.getPassword(), e.getPassword()))
                .map(e -> new LoginResponseDto(SecurityHelpers.generateJwtToken(e.getUsername(), secretProperty.getSecret()), e.getRefreshToken()));
    }

    public Optional<User> register(RegisterRequestDto registerRequest) {
        if (usersRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return Optional.empty();
        }

        if (Strings.isNullOrEmpty(registerRequest.getUsername()) || Strings.isNullOrEmpty(registerRequest.getPassword()) || Strings.isNullOrEmpty(registerRequest.getEmail())) {
            return Optional.empty();
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRefreshToken(SecurityHelpers.generateRefreshToken());
        user.setRefreshTokenExp(LocalDateTime.now().plusHours(12));
        user.setEmail(registerRequest.getEmail());

        usersRepository.save(user);

        return Optional.of(user);
    }

    public Optional<RefreshResponseDto> refresh(String accessToken, RefreshRequestDto registerRequest) {
        Optional<User> optionalUser = usersRepository.findByRefreshToken(registerRequest.getRefreshToken());

        if (!optionalUser.isPresent()) {
            return Optional.empty();
        }

        User user = optionalUser.get();

        if (LocalDateTime.now().isAfter(user.getRefreshTokenExp())) {
            return Optional.empty();
        }

        if (!accessToken.startsWith("Bearer ")){
            return Optional.empty();
        }

        String jwtAccessToken = accessToken.replaceFirst("Bearer ", "");

        if(SecurityHelpers.isTokenValid(user.getUsername(), jwtAccessToken, secretProperty.getSecret())){
            String newAccessToken = SecurityHelpers.generateJwtToken(user.getUsername(), secretProperty.getSecret());
            String newRefreshToken = SecurityHelpers.generateRefreshToken();
            LocalDateTime newRefreshTokenExp = LocalDateTime.now().plusHours(12);

            user.setRefreshToken(newRefreshToken);
            user.setRefreshTokenExp(newRefreshTokenExp);
            usersRepository.save(user);

            return Optional.of(new RefreshResponseDto(newAccessToken, newRefreshToken));
        }

        return Optional.empty();
    }
}
