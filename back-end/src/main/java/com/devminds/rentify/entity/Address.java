package com.devminds.rentify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
   private int id ;
    @Column(name = "city")
   private String city ;
    @Column(name = "street")
   private String street ;
    @Column(name = "post_code")
   private String postCode ;

    @Column(name = "street_number" )
   private String  streetNumber ;



}
