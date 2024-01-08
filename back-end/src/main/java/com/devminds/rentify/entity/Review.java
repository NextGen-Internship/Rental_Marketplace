package com.devminds.rentify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "review")
public class Review {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(name = "rating")
    private int rating;

    @Column(name = "comments")
    private String comments;

    @ManyToOne
    private Item item;

    @ManyToOne
    private User user;
}
