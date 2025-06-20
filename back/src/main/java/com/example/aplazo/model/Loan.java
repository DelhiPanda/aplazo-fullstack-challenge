package com.example.aplazo.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Loan {
    @Id
    @GeneratedValue
    private UUID id;
    private BigDecimal amount;
    private String status;
    private LocalDateTime createdAt;

    @ManyToOne
    private Customer customer;

}