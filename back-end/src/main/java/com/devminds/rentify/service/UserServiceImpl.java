package com.devminds.rentify.service;

import com.devminds.rentify.dto.UserDto;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.exception.DuplicateEntityException;
import com.devminds.rentify.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private static final String USER_NOT_FOUND_MESSAGE = "User with %d id not found.";

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, ModelMapper mapper) {
        this.userRepository = userRepository;
        this.modelMapper = mapper;
    }

    @Override
    public User saveUser(User user) {

        checkIfIsDuplicateByEmail(user);

        checkIfIsDuplicateByPhoneNumber(user);


        return this.userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {

        return userRepository.findByEmail(email);
    }

    private void checkIfIsDuplicateByPhoneNumber(User user) {
        userRepository.findByPhone(user.getPhoneNumber())
                .ifPresent(existingUser -> {
                    throw new DuplicateEntityException("User", "phoneNumber", user.getPhoneNumber());
                });
    }


    private void checkIfIsDuplicateByEmail(User user) {
        userRepository.findByEmail(user.getEmail())
                .ifPresent(existingUser -> {
                    throw new DuplicateEntityException("User", "Email", user.getEmail());
                });

    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapUserToUserDto)
                .toList();
    }

    public UserDto getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::mapUserToUserDto)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MESSAGE, id)));
    }

    private UserDto mapUserToUserDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
}

