package com.devminds.rentify.controller;

import com.devminds.rentify.dto.UserDto;
import com.devminds.rentify.service.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@RequestMapping("/rentify")
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    private static String INVALID_TOKEN_MESSAGE = "Invalid token";

    @PostMapping("/google-login")
    public ResponseEntity<String> handleGoogleLogin(@RequestHeader("Authorization") String googleCredential) throws GeneralSecurityException, IOException {
        String token = this.userService.mapGoogleTokenToOurToken(googleCredential);
        if(token == null){
            return new ResponseEntity<>(INVALID_TOKEN_MESSAGE,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(token,HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

}
