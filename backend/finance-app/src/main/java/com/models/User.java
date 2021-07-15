package com.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data

@NoArgsConstructor
@RequiredArgsConstructor

@Entity
@Table(name = "User")
public class User {

    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @NonNull
    @Column(nullable = false, length = 100)
    private String username;

    @NonNull
    @Column(nullable = false, length = 200)
    private String password;

    @NonNull
    @Column(nullable = false, length = 50)
    private String email;

    @NonNull
    @Column(nullable = false)
    private String refreshToken;

    @NonNull
    @Column(nullable = false)
    private LocalDateTime refreshTokenExp;

    @OneToMany(mappedBy = "user")
    private Set<Company> companies;
}
