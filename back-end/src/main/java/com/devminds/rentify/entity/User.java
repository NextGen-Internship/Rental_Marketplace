package com.devminds.rentify.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User  implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
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
 //   @Min(8)
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
    @JoinColumn(name = "id")  // Foreign key in the Address table
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getUsername() {
        return email;
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
}
