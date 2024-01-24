package com.devminds.rentify.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "item")
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


    @ManyToOne
    @JsonIgnore
    private User user;


    @ManyToOne
    private Address address;

    @OneToMany
    private List<History> histories;

    @OneToMany
    private List<Picture> pictures;

    @OneToMany
    private List<LikedItem> likedItems;

    @OneToMany
    private List<Rent> rents;

    @OneToMany
    private List<Review> reviews;
}
