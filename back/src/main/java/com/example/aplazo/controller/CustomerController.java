package com.example.aplazo.controller;

import com.example.aplazo.dto.CustomerRequest;
import com.example.aplazo.dto.CustomerResponse;
import com.example.aplazo.model.Customer;
import com.example.aplazo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/v1/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<CustomerResponse> createCustomer(@RequestBody CustomerRequest request) {
        Customer customer = new Customer();
        customer.setFirstName(request.firstName);
        customer.setLastName(request.lastName);
        customer.setSecondLastName(request.secondLastName);
        customer.setDateOfBirth(request.dateOfBirth);
        customer.setGender(request.gender);
        customer.setBirthState(request.birthState);
        customer.setCurp(request.curp);
        customer.setCreatedAt(LocalDateTime.now());
        customer.setCreditLineAmount(1000.0);
        customer.setAvailableCreditLineAmount(10000.0);

        customer = customerRepository.save(customer);

        CustomerResponse response = new CustomerResponse();
        response.id = customer.getId();
        response.createdAt = customer.getCreatedAt();
        response.creditLineAmount = customer.getCreditLineAmount();
        response.availableCreditLineAmount = customer.getAvailableCreditLineAmount();

        return ResponseEntity.created(URI.create("/v1/customers/" + customer.getId())).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomer(@PathVariable UUID id) {
        return customerRepository.findById(id).map(customer -> {
            CustomerResponse response = new CustomerResponse();
            response.id = customer.getId();
            response.createdAt = customer.getCreatedAt();
            response.creditLineAmount = customer.getCreditLineAmount();
            response.availableCreditLineAmount = customer.getAvailableCreditLineAmount();

            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }
}