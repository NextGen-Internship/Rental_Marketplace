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

import java.util.Optional;

@RestController
@RequestMapping("/rentify/favorite")
@RequiredArgsConstructor
public class LikeController {

    private final LikedItemService likeService;
    private final JwtService jwtService;
    private final UserService userService;
    private final ItemService itemService;


//              const response = await fetch("http://localhost:8080/rentify/favorite/liked", {
    @PostMapping("/liked")
    public ResponseEntity<String> likeItem(@RequestHeader("Authorization") String token, @RequestBody LikeDto likeDto) {
        try {

            System.out.println("Received Token: " + token);

//            String cleanedToken = token.trim()

            System.out.println("chistiqqtt tokeeenn: "+ token);
            System.out.println("predivzimane na imeila");
            String email = jwtService.extractUsername(token);
            System.out.println(email + "/////////tova e imeilaa");
            Optional<User> userOptional = userService.findByEmail(email);
            User user = userOptional.orElse(null);


            System.out.println("Useerr vzeet");

//            Item  item = itemService.findById(likeDto.getItemId());

            try {
                // ...
                Item item = itemService.findById(likeDto.getItemId());

                if (likeDto.isUnlike()) {
                    likeService.unlikeItem(user, item);
                } else {
                    likeService.saveLike(user, item);
                }
                // ...
            } catch (ItemNotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
            } catch (UserNotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not authenticated");
            }


//            likeService.saveLike(user , item);

            return ResponseEntity.ok("Like recorded successfully");
        } catch (Exception e) {
            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error recording like");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");

        }
    }



}
