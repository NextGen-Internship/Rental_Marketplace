package com.devminds.rentify.controller;

import com.devminds.rentify.service.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StripeController {
    private final StripeService stripeService;

    @PostMapping("/rentify/stripe/checkout/{id}")
    public ResponseEntity<String> createCheckout(@PathVariable Long id) throws StripeException {
        String session = stripeService.createCheckoutSession(id);

        return new ResponseEntity<>(session,HttpStatus.OK);
    }


}
