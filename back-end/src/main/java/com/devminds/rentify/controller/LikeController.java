package com.devminds.rentify.controller;

import com.devminds.rentify.config.JwtService;
import com.devminds.rentify.dto.LikeDto;
import com.devminds.rentify.entity.Item;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.exception.ItemNotFoundException;
import com.devminds.rentify.exception.UserNotFoundException;
import com.devminds.rentify.service.ItemService;
import com.devminds.rentify.service.LikedItemService;
import com.devminds.rentify.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/rentify/favorite")
@RequiredArgsConstructor
public class LikeController {

    private final LikedItemService likeService;
    private final JwtService jwtService;
    private final UserService userService;
    private final ItemService itemService;
    @PostMapping("/liked")
    public ResponseEntity<String> likeItem(@RequestBody LikeDto likeDto) {
        try {

            Optional<User> userOptional = userService.findById(likeDto.getUserId());
            User user = userOptional.orElse(null);

            Item  item = itemService.findById(likeDto.getItemId());
            if (likeDto.isLiked()) {
                likeService.saveLike(user, item);
            } else {

                likeService.unlikeItem(user, item);
            }

            return ResponseEntity.ok("Like recorded successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error recording like");

        }
    }

    @GetMapping("/userFavorite/{userId}")
    public ResponseEntity<List<Long>> getLikedItemsByUserId(@PathVariable Long userId) {
        List<Long> likedItems = likeService.getLikedItemsByUserId(userId);
        return ResponseEntity.ok(likedItems);
    }





}
