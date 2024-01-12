package com.devminds.rentify.entity;

import com.devminds.rentify.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.Set;

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

    public Set<GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role.name()));
    }
}
