package com.devminds.rentify.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
@Builder
@Entity
@Table(name = "address")
public class Address {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;
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
