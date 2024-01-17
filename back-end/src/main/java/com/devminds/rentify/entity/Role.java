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



    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private UserRole role ;



    @NotEmpty
    @Column(name = "role_description")
    private String description;


    public Role() {
        this.description = "Some measafgasfd";
    }
    public Role(UserRole role) {
        this.role = role;
        this.description = "Some measafgasfd";
    }
}
