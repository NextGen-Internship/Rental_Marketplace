package com.devminds.rentify.controller;

import com.devminds.rentify.service.StripeService;
import com.stripe.exception.StripeException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StripeController {
    private final StripeService stripeService;

    @PostMapping("create/stripe")
    public ResponseEntity<?> createStripeLinkedAccount(HttpServletRequest httpServletRequest) throws StripeException {
     stripeService.getClientIpAddress(httpServletRequest);
     stripeService.createStripeAccount(httpServletRequest);
     // get body from request
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
