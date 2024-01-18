package com.devminds.rentify.auth;

public interface AuthService {
    AuthenticationRespone register(UserRegisterDto userRegisterDto);

    AuthenticationRespone login(LoginDto loginDto);
}
