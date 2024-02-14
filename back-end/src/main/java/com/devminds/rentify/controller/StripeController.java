package com.devminds.rentify.controller;

import com.devminds.rentify.dto.CreateItemDto;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class StripeController {
    private final StripeService stripeService;

//    @PostMapping("create/stripe")
//    public ResponseEntity<?> createStripeLinkedAccount(@RequestHeader HttpServletRequest httpServletRequest, @RequestBody User user) throws StripeException {
//        Account stripeAccount = stripeService.createStripeAccount(httpServletRequest, user.getId());
//        // get body from request
//        return new ResponseEntity<>(stripeAccount,HttpStatus.OK);
//    }

    @PostMapping("stripe/checkout")
    public ResponseEntity<?> createCheckout(Product product, Account account) throws StripeException {
        Session session = stripeService.createCheckoutSession(product, account);

        return new ResponseEntity<>(session,HttpStatus.OK);
    }


    @PostMapping("stripe/item")
    public ResponseEntity<?> createItem(CreateItemDto createItemDto) throws StripeException, IOException {
        Product product = stripeService.createProduct(createItemDto);

        return new ResponseEntity<>(product,HttpStatus.OK);
    }

}
