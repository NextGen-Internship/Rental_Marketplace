package com.devminds.rentify.auth;

import com.devminds.rentify.entity.Address;
import com.devminds.rentify.entity.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AddressMapper {

    private final ModelMapper modelMapper;

    public Address mapToAddress(AddressDto addressDto) {
        return modelMapper.map(addressDto, Address.class);
    }
}
