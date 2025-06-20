package com.example.aplazo.repository;

import com.example.aplazo.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface LoanRepository extends JpaRepository<Loan, UUID> {}