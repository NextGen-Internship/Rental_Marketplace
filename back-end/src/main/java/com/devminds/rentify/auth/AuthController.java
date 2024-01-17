package com.devminds.rentify.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationRespone> register(@RequestBody UserRegisterDto request){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationRespone> login(@RequestBody LoginDto request){
        return ResponseEntity.ok(service.login(request));
    }
}
