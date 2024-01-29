package com.devminds.rentify.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "item")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Item {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @NotEmpty
    @Size(max = 255)
    @Column(name = "description")
    private String description;


    @NotNull
    @Positive
    @Column(name = "price")
    private BigDecimal price;


    @NotNull
    @Column(name = "posted_date")
    private LocalDateTime postedDate;

    @Positive
    @NotNull
    @Column(name = "deposit")
    private float deposit;

    @ManyToOne
    private Category category;

    private String thumbnail;


    @ManyToOne
    @JsonIgnore
    private User user;


    @JsonIgnore
    @ManyToOne
    private Address address;

//    @OneToMany
//    private List<History> histories;

    @OneToMany(fetch = FetchType.LAZY , mappedBy = "item")
    private List<Picture> pictures;

    @OneToMany(fetch = FetchType.LAZY , mappedBy = "item")
    private List<LikedItem> likedItems;

    @OneToMany
    private List<Rent> rents;

    @OneToMany
    private List<Review> reviews;
}
