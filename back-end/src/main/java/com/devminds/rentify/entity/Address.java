package com.devminds.rentify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "address")
public class Address {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;
    @Column
    private String city;
    @Column
    private String street;
    @Column(name = "post_code")
    private String postCode;

    @Column(name = "street_number")
    private String streetNumber;


}
