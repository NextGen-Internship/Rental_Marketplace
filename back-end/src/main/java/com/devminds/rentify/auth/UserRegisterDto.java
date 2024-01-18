package com.devminds.rentify.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class UserRegisterDto implements UserDetails {

    @NotEmpty(message = "firstName is required")
    private String firstName;

    @NotEmpty(message = "lastName is required")
    private String lastName;

    @NotEmpty(message = "email is required")
    @Email
    private String email;

    @NotEmpty(message = "password is required")
    @Min(8)
    private String password;

    @NotEmpty(message = "confirm password is required")
    private String confirmPassword;

    @NotEmpty(message = "phoneNumber is required")
    private String phoneNumber;

    @NotEmpty(message = "Address is required")
    private List<AddressDto> addresses;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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
