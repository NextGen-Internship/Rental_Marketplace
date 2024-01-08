package com.devminds.rentify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phoneNumber;

    @Column(name = "profile_picture")
    private String profilePicture;


    @OneToMany
    private List<Address> addresses;


    @OneToMany
    private List<Item> items;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany
    private List<Payment> payments;


    @OneToMany
    private List<Rent> rents;

    @OneToMany
    private List<History> histories;

}
