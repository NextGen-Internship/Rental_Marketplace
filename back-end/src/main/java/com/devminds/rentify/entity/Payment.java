package com.devminds.rentify.entity;

import com.devminds.rentify.enums.PaymentMethod;
import com.devminds.rentify.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "payment")
public class Payment {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    @Column(name = "amount")
    private BigDecimal amount;

    private PaymentStatus status;

    private Date date;

    @ManyToOne
    private User owner;

    @ManyToOne
    private User receiver;


    private PaymentMethod paymentMethod;

    @OneToOne
    private Rent rent;
}
