package com.devminds.rentify.service;

import com.devminds.rentify.auth.DuplicateEntityException;
import com.devminds.rentify.entity.User;
import jakarta.persistence.EntityNotFoundException;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findByEmail(String email);
}
