package com.devminds.rentify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name= "user_role")

public class Role {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id ;

    @Column(name = "description")
    private String description;
}
