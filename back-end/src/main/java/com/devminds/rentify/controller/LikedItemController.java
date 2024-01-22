package com.devminds.rentify.controller;

import com.devminds.rentify.dto.LikedItemDto;
import com.devminds.rentify.service.LikedItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/rentify/likes")
public class LikedItemController {
    private final LikedItemService likedItemService;

    @Autowired
    public LikedItemController(LikedItemService likedItemService) {
        this.likedItemService = likedItemService;
    }

    @GetMapping
    public ResponseEntity<List<LikedItemDto>> getAllLikes() {
        return new ResponseEntity<>(likedItemService.getAllLikes(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<LikedItemDto>> getAllLikesByUserId(@PathVariable Long id) {
        return new ResponseEntity<>(likedItemService.getAllLikesByUserId(id), HttpStatus.OK);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<List<LikedItemDto>> getAllLikesByItemId(@PathVariable Long id) {
        return new ResponseEntity<>(likedItemService.getAllLikesByItemId(id), HttpStatus.OK);
    }
}
