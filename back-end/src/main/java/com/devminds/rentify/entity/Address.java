package com.devminds.rentify.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column
    @NotEmpty
    @Size(max = 100)
    private String city;


    @Column
    @NotEmpty
    @Size(max = 100)
    private String street;

    @Column(name = "post_code")
    @NotEmpty
    @Size(max = 10)
    private String postCode;

    @Column(name = "street_number")
    @NotEmpty
    @Size(max = 10)
    private String streetNumber;


}
