package com.devminds.rentify.entity;


import com.devminds.rentify.enums.UserRole;
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
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotEmpty
    @Size(max = 30)
    @Column(name = "first_name")
    private String firstName;

    @NotEmpty
    @Size(max = 30)
    @Column(name = "last_name")
    private String lastName;

    @NotEmpty
    @Column(name = "password")
    private String password;

    @Column(name = "email")
    @Email
    private String email;

    @NotEmpty
    @Column(name = "phone")
    private String phoneNumber;

    @Column(name = "profile_picture")
    private String profilePicture;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    private List<Address> addresses;


    @OneToMany
    @JoinColumn(name = "id")
    private List<Item> items = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

//
//    @OneToMany
//    private List<Payment> payments;


    @OneToMany
    private List<Rent> rents;

    @OneToMany(mappedBy = "user")
    private List<History> histories = new ArrayList<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(getUserRoleFromRole().toString()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    private UserRole getUserRoleFromRole() {
        return role != null ? role.getRole() : UserRole.USER;

    }
}
