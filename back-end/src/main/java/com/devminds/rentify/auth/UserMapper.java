package com.devminds.rentify.auth;

import com.devminds.rentify.entity.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;

    public User mapToUser(UserRegisterDto userRegisterDto) {
        return modelMapper.map(userRegisterDto, User.class);
    }

}
