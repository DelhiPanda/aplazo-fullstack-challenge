package com.example.aplazo.controller;

import com.example.aplazo.dto.LoanRequest;
import com.example.aplazo.dto.LoanResponse;
import com.example.aplazo.model.Customer;
import com.example.aplazo.model.Loan;
import com.example.aplazo.repository.CustomerRepository;
import com.example.aplazo.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/v1/loans")
public class LoanController {

    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<LoanResponse> createLoan(@RequestBody LoanRequest request) {
        Optional<Customer> customer = customerRepository.findById(request.customerId);

        if (customer.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Loan loan = new Loan();
        loan.setCustomer(customer.get());
        loan.setAmount(BigDecimal.valueOf(request.amount));
        loan.setCreatedAt(LocalDateTime.now());
        loan.setStatus("ACTIVE");
        loan = loanRepository.save(loan);

        LoanResponse response = new LoanResponse();
        response.id = loan.getId();
        response.customerId = customer.get().getId();
        response.status = loan.getStatus();
        response.createdAt = loan.getCreatedAt();

        LoanResponse.PaymentPlan plan = new LoanResponse.PaymentPlan();
        plan.commissionAmount = 100.0;
        plan.installments = new LoanResponse.Installment[5];

        for (int i = 0; i < 5; i++) {
            LoanResponse.Installment installment = new LoanResponse.Installment();
            installment.amount = request.amount / 5.0;
            installment.scheduledPaymentDate = LocalDateTime.now().plusMonths(i + 1).toLocalDate().toString();
            installment.status = i == 0 ? "NEXT" : "PENDING";
            plan.installments[i] = installment;
        }
        response.paymentPlan = plan;

        return ResponseEntity.created(URI.create("/v1/loans/" + loan.getId())).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanResponse> getLoan(@PathVariable UUID id) {
        return loanRepository.findById(id).map(loan -> {
            LoanResponse response = new LoanResponse();
            response.id = loan.getId();
            response.customerId = loan.getCustomer().getId();
            response.status = loan.getStatus();
            response.createdAt = loan.getCreatedAt();
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }
}