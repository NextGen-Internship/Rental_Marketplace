package com.devminds.rentify.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "picture")
public class Picture {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @NotEmpty
    @Size(max = 512)
    @Column(name = "url")
    private String url;

    @ManyToOne
    private Item item;

}
