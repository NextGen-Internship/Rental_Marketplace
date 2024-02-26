package com.devminds.rentify.dto;

import lombok.Data;

import javax.annotation.Nullable;
import jakarta.validation.constraints.Size;

@Data
public class AddUserDetailsDto {

    @Nullable
    @Size(max = 255)
    String iban;

    @Nullable
    @Size(max = 13)
    String phoneNumber;
}
