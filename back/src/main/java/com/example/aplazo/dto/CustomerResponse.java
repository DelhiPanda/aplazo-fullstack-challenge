package com.example.aplazo.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class CustomerResponse {
    public UUID id;
    public LocalDateTime createdAt;
    public double creditLineAmount;
    public double availableCreditLineAmount;
}