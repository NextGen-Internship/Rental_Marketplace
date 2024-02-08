package com.devminds.rentify.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.annotation.Nullable;

@Data
@Builder
public class UpdatedUserInfoDto {

    @Nullable
    private String firstName;

    @Nullable
    private String lastName;

    @Nullable
    private String phoneNumber;

    @Nullable
    private AddressDto addressDto;
}
