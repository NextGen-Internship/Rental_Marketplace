package com.devminds.rentify.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rentify")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;



    @PostMapping("/register")
    public ResponseEntity<AuthenticationRespone> register(@RequestBody UserRegisterDto userRegisterDto){

        try {
            AuthenticationRespone authenticationResponse = authService.register(userRegisterDto);
            return ResponseEntity.ok(authenticationResponse);
        } catch (DuplicateEntityException e) {
            AuthenticationRespone errorResponse = AuthenticationRespone.builder()
                    .errorMessage(e.getMessage())
                    .build();
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationRespone> login(@RequestBody LoginDto request){
        return ResponseEntity.ok(authService.login(request));
    }
}
