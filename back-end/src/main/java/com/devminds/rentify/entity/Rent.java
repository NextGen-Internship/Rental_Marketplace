package com.devminds.rentify.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "rent")
public class Rent {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @ManyToOne
    private Item item;

    @ManyToOne
    private User user;

    @NotEmpty
    @Column(name = "start_date")
    private Date startDate;

    @NotEmpty
    @Column(name = "end_date")
    private Date endDate;

    @OneToOne(mappedBy = "rent")
    private Payment payment;
}
