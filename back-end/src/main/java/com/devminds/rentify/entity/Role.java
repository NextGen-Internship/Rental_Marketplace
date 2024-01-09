package com.devminds.rentify.entity;

import com.devminds.rentify.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "user_role")

public class Role {


    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private UserRole role;


    @NotEmpty
    @Size(max = 255)
    @Column(name = "description")
    private String description;
}
