package com.devminds.rentify.dto;

import com.devminds.rentify.entity.Item;
import com.devminds.rentify.entity.User;
import lombok.Data;

import java.util.Date;

@Data
public class HistoryDto {
    private Long id;
    private PlainUserDto user;
    private PlainItemDto item;
    private Date date;
}
