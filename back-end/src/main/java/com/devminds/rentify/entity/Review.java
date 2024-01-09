package com.devminds.rentify.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "review")
public class Review {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @NotEmpty
    @Positive
    @Column(name = "rating")
    private int rating;

    @NotEmpty
    @Size(max = 255)
    @Column(name = "comments")
    private String comments;

    @ManyToOne
    private Item item;

    @ManyToOne
    private User user;
}
