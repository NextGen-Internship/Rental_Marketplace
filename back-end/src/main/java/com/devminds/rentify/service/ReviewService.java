package com.devminds.rentify.service;

import com.devminds.rentify.dto.ItemDto;
import com.devminds.rentify.dto.ReviewDto;
import com.devminds.rentify.entity.Item;
import com.devminds.rentify.entity.Review;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.exception.DuplicateEntityException;
import com.devminds.rentify.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepositoryrepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final ItemService itemService;

    public ReviewDto addReview(Long userId, Long itemId, ReviewDto reviewDto) {

        Review review = new Review();
        try {

            User existingUser = userService.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

            Item itemToReview = itemService.findById(itemId);


            System.out.println(reviewDto.getRatingStars());
            review.setRating(reviewDto.getRatingStars());
            review.setComments(reviewDto.getComments());
            review.setUser(existingUser);
            review.setItem(itemToReview);

            reviewRepositoryrepository.save(review);

        }catch (EntityNotFoundException e ){

        }


//        System.out.println( mapReviewDtoToIReview(reviewDto));

        return mapReviewToReviewDto(review);

    }



    private ReviewDto mapReviewToReviewDto(Review review) {
        return modelMapper.map(review, ReviewDto.class);
    }

    private Review mapReviewDtoToIReview(ReviewDto reviewDto) {
        return modelMapper.map(reviewDto, Review.class);
    }
}
