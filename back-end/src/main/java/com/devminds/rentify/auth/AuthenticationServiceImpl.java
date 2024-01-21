package com.devminds.rentify.auth;

import com.devminds.rentify.config.UserMapper;
import com.devminds.rentify.config.JwtService;
import com.devminds.rentify.dto.LoginDto;
import com.devminds.rentify.dto.UserRegisterDto;
import com.devminds.rentify.entity.Role;
import com.devminds.rentify.entity.User;

import com.devminds.rentify.enums.UserRole;
import com.devminds.rentify.exception.UserNotFoundException;
import com.devminds.rentify.repository.RoleRepository;
import com.devminds.rentify.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;

@Service
@RequiredArgsConstructor

public class AuthenticationServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;
    @Override
    public AuthenticationRespone register(UserRegisterDto userRegisterDto) {

        User user = userMapper.mapToUser(userRegisterDto);
        user.setRole(roleRepository.findUserRole());
        user.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));


        userService.saveUser(user);

        var token = jwtService.generateToken(user);
        return AuthenticationRespone.builder()
                .token(token)
                .email(user.getEmail()).build();

    }

    @Override
    public AuthenticationRespone login(LoginDto loginDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );

            var user = userService.findByEmail(loginDto.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

            var token = jwtService.generateToken(user);
            return AuthenticationRespone.builder()
                    .token(token)
                    .email(user.getEmail())
                    .build();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
}
