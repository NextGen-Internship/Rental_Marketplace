package com.devminds.rentify.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "liked_item")
public class LikedItem {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;


    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Long getItemId() {
        return item.getId();
    }
}


