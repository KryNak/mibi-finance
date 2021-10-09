package com.configurations;

import com.helpers.SecurityHelpers;
import com.models.User;
import com.repositories.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Component
public class Beans {

    @Bean
    RestTemplate restTemplate(){
        return new RestTemplate();
    }

    @Bean
    @Profile("Dev")
    CommandLineRunner commandLineRunner(UsersRepository usersRepository, PasswordEncoder passwordEncoder){
        return args -> {
            User user = new User(
                    1L, "user", passwordEncoder.encode("qwer1234"),
                    "User@gmail.com", SecurityHelpers.generateRefreshToken(), LocalDateTime.now().plusHours(12)
            );

            usersRepository.save(user);
        };
    }

}
