package com.devminds.rentify.dto;

import com.devminds.rentify.entity.Category;
import com.devminds.rentify.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Date;

public class ItemDto {
    private Long id;

    @NotEmpty
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    @NotEmpty
    @Positive
    private BigDecimal price;

    @NotEmpty
    private Date postedDate;

    @Positive
    @NotEmpty
    private float deposit;

    private Category category;

    @NotBlank
    private String username;
}
