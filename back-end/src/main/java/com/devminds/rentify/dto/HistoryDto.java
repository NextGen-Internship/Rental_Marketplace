package com.devminds.rentify.dto;

import lombok.Data;

import java.util.Date;

@Data
public class HistoryDto {
    private Long id;
    private PlainUserDto user;
    private PlainItemDto item;
    private Date date;
}
