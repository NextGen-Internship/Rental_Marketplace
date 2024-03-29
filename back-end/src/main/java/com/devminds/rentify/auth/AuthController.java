package com.devminds.rentify.auth;

import com.devminds.rentify.dto.LoginDto;
import com.devminds.rentify.dto.UserRegisterDto;
import com.devminds.rentify.exception.DuplicateEntityException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/rentify")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationRespone> register(@RequestBody UserRegisterDto userRegisterDto) {

        try {
            AuthenticationRespone authenticationResponse = authService.register(userRegisterDto);
            return ResponseEntity.ok(authenticationResponse);
        } catch (DuplicateEntityException e) {
            AuthenticationRespone errorResponse = AuthenticationRespone.builder()
                    .errorMessage(e.getMessage())
                    .build();
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationRespone> login(@RequestBody LoginDto request) throws IOException {
        return ResponseEntity.ok(authService.login(request));
    }
}
