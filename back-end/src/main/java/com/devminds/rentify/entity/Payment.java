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
@NoArgsConstructor
@AllArgsConstructor
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
//    @JoinColumn(name = "id")
    private User owner;

    @ManyToOne
//    @JoinColumn(name = "id")
    private User receiver;


    private PaymentMethod paymentMethod;

    @OneToOne
//    @JoinColumn(name = "id")
    private Rent rent;
}
