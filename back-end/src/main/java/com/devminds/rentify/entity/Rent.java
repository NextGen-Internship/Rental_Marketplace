package com.devminds.rentify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rent")
public class Rent {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @ManyToOne
    private Item item;

    @ManyToOne
    private User user;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @OneToOne(mappedBy = "rent")
    private Payment payment;
}
