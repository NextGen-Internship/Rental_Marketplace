package com.devminds.rentify.auth;

import com.devminds.rentify.dto.LoginDto;
import com.devminds.rentify.dto.UserRegisterDto;

import java.io.IOException;

public interface AuthService {
    AuthenticationResponse register(UserRegisterDto userRegisterDto) throws IOException;

    AuthenticationResponse login(LoginDto loginDto);
}
