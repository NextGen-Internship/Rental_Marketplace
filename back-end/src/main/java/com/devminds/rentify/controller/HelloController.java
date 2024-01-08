package com.devminds.rentify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/rentify")
public class HelloController {

    @GetMapping("/hello")
    public ResponseEntity<String> getHelloWorld() {
        return ResponseEntity.ok("Hello World");
    }
}
