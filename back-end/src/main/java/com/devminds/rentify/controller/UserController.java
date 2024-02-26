package com.devminds.rentify.controller;

import com.devminds.rentify.dto.AddUserDetailsDto;
import com.devminds.rentify.dto.UpdatedUserInfoDto;
import com.devminds.rentify.dto.UserDto;
import com.devminds.rentify.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@RequestMapping("/rentify")
public class UserController {

    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    private static String INVALID_TOKEN_MESSAGE = "Invalid token";

    @PostMapping("/google-login")
    public ResponseEntity<String> handleGoogleLogin(@RequestHeader("Authorization") String googleCredential) throws GeneralSecurityException, IOException {
        String token = this.userService.mapGoogleTokenToOurToken(googleCredential);
        if (token == null) {
            return new ResponseEntity<>(INVALID_TOKEN_MESSAGE, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id,
                                              @RequestBody UpdatedUserInfoDto updatedUserInfoDto) {

        return new ResponseEntity<>(userService.updateUserInfo(id, updatedUserInfoDto), HttpStatus.OK);

    }

    @PutMapping("/updateProfilePicture/{userId}")
    public ResponseEntity<UserDto> uploadFile(@PathVariable Long userId, @RequestParam("file") MultipartFile file)
            throws IOException {

        return new ResponseEntity<>(userService.updateProfilePicture(userId, file), HttpStatus.OK);

    }

    @PatchMapping("/users/add-additional-info/{id}")
    public ResponseEntity<UserDto> addAdditionalInfo(@PathVariable Long id,
                                                     @RequestBody AddUserDetailsDto userDetailsDto) {

        return new ResponseEntity<>(userService.partialUpdate(id, userDetailsDto), HttpStatus.OK);
    }
}
