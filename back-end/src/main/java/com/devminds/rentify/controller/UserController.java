package com.devminds.rentify.controller;

import com.devminds.rentify.service.UserServiceImpl;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rentify")
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }


    @PostMapping("/google-login")
    public void handleGoogleLogin(@RequestHeader("Authorization") String googleCredential) {
    }



}
