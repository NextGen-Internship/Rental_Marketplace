package com.devminds.rentify.service;

import com.devminds.rentify.repository.UserRepository;
import com.devminds.rentify.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VerificationTokenService {

    private final EmailService emailService;
    private final UserRepository userRepository;
    private final VerificationTokenRepository verificationTokenRepository;

    @Autowired
    public VerificationTokenService(EmailService emailService, UserRepository userRepository, VerificationTokenRepository verificationTokenRepository) {
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.verificationTokenRepository = verificationTokenRepository;
    }

    public void sendVerificationEmail(String email) {

    }

    public void confirmAccount(String token) {

    }
}
