package com.devminds.rentify.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class StripeItemDto {
    private Long id;

    @NotEmpty
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    @NotEmpty
    @Positive
    private BigDecimal price;

    @Positive
    @NotEmpty
    private float deposit;
}
