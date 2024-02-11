package com.devminds.rentify.service;

import com.devminds.rentify.dto.ReviewDto;
import com.devminds.rentify.dto.UserDto;
import com.devminds.rentify.dto.UserReviewDto;
import com.devminds.rentify.entity.Item;
import com.devminds.rentify.entity.Review;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
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

            reviewRepository.save(review);

        } catch (EntityNotFoundException e) {

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

    public Double getRating(Long itemId) {
        double sum = 0;
        List<Review> reviews = reviewRepository.findByItemId(itemId);
        if (reviews.isEmpty()) {
            return 0.0;
        }
        for (Review review : reviews) {
            sum += review.getRating();
        }

        double average = sum / reviews.size();

        return Math.round(average * 10.0) / 10.0;
    }


    public List<UserReviewDto> getReviews(Long itemId) {
        List<Review> reviews = reviewRepository.findByItemId(itemId);
        return reviews.stream()
                .map(review -> UserReviewDto.builder()
                        .firstName(review.getUser().getFirstName())
                        .lastName(review.getUser().getLastName())
                        .stars(review.getRating())
                        .comment(review.getComments())
                        .profilePicture(review.getUser().getProfilePicture())
                        .build())
                .collect(Collectors.toList());

    }
}

