package com.devminds.rentify.dto;

import com.devminds.rentify.entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class CreateItemDto {

    private int id;

    private String name;

    private String description;

    private BigDecimal price;

    private Date postedDate;

    private float deposit;

    private Category category;

    private User user;

    private List<Picture> pictures;

    private Address address;

}
