package com.example.aplazo.dto;


import java.time.LocalDateTime;
import java.util.UUID;

public class LoanResponse {
    public UUID id;
    public UUID customerId;
    public String status;
    public LocalDateTime createdAt;
    public PaymentPlan paymentPlan;

    public static class PaymentPlan {
        public double commissionAmount;
        public Installment[] installments;
    }

    public static class Installment {
        public double amount;
        public String scheduledPaymentDate;
        public String status;
    }
}
