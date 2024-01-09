package com.devminds.rentify.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "item")
public class Item {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "posted_date")
    private Date postedDate;

    @Column(name = "deposit")
    private float deposit;

    @ManyToOne
    private Category category;

    @ManyToOne
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
