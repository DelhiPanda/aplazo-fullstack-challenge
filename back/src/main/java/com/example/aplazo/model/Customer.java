package com.example.aplazo.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true)
    private String username;
    private String password;
    private String role;

    private String firstName;
    private String lastName;
    private String secondLastName;
    private LocalDate dateOfBirth;
    private String gender;
    private String birthState;
    private String curp;
    private LocalDateTime createdAt;
    private double creditLineAmount;
    private double availableCreditLineAmount;

    // Getters and setters
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> role);
    }

}