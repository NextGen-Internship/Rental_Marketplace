package com.devminds.rentify.dto;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreatePayment {
    @SerializedName("items")
    StripeItemDto item;

    @SerializedName("customer")
    UserDto customer;


    public Long calculateOrderAmount() {
        BigDecimal priceToPay = item.getPrice().add(BigDecimal.valueOf(item.getDeposit()));

       return priceToPay.longValueExact();
    }
}
