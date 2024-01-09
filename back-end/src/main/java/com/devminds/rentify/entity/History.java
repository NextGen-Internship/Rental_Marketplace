package com.devminds.rentify.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

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
