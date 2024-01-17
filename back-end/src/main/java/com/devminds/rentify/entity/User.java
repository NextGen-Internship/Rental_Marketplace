package com.devminds.rentify.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @NotEmpty
    @Size(max = 30)
    @Column(name = "first_name")
    private String firstName;

    @NotEmpty
    @Size(max = 30)
    @Column(name = "last_name")
    private String lastName;

    @NotEmpty
    @Min(8)
    @Column(name = "password")
    private String password;

    @Column(name = "email")
    @NotEmpty
    @UniqueElements
    @Email
    private String email;

    @NotEmpty
    @UniqueElements
    @Column(name = "phone")
    private String phoneNumber;

    @Column(name = "profile_picture")
    private String profilePicture;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id")  // Foreign key in the Address table
    private List<Address> addresses;


//    @OneToMany
//    @JoinColumn(name = "id")
//    private List<Item> items = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

//    @OneToMany
//    private List<Payment> payments;

//
//    @OneToMany
//    private List<Rent> rents;
//
//    @OneToMany
//    private List<History> histories;

}
