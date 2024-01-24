package com.devminds.rentify.service;

import com.devminds.rentify.exception.DuplicateEntityException;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    @Override
    public Optional<User> findById(long id) {

        return userRepository.findById(id);
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

}

