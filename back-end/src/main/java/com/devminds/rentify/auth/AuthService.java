package com.devminds.rentify.auth;

import com.devminds.rentify.dto.LoginDto;
import com.devminds.rentify.dto.UserRegisterDto;

public interface AuthService {
    AuthenticationRespone register(UserRegisterDto userRegisterDto);

    AuthenticationRespone login(LoginDto loginDto);
}
