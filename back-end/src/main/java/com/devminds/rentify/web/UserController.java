package com.devminds.rentify.web;

import com.devminds.rentify.service.UserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rentify")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/google-login")
    public void handleGoogleLogin(@RequestHeader("Authorization") String googleCredential) {

    }



}