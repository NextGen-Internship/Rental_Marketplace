package com.devminds.rentify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "liked_item")
public class LikedItem {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id ;

    @ManyToOne
    private Item item;

    @ManyToMany(mappedBy = "likedItems")
    private List<User> users;
}
