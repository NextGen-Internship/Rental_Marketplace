package com.devminds.rentify.controller;

import com.devminds.rentify.dto.CreatePayment;
import com.devminds.rentify.dto.CreatePaymentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {


    @PostMapping("/create-payment-intent")
    public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePayment createPayment) throws StripeException {

        AccountCreateParams accountCreateParams = new AccountCreateParams.Builder()
                .setEmail(createPayment.getCustomer().getEmail())

                .build();

        PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                .setCurrency("usd")
                .setAmount(createPayment.calculateOrderAmount() * 100L)
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(createParams);



        return new CreatePaymentResponse(paymentIntent.getClientSecret());
    }
}
