package com.devminds.rentify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data

@Entity
@Table(name = "history")
public class History {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Item item;

    @Column(name = "datetime")
    private Date date;
}
