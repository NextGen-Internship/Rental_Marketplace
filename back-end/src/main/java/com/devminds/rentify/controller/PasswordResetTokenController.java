package com.devminds.rentify.controller;

import com.devminds.rentify.email.EmailService;
import com.devminds.rentify.entity.PasswordResetToken;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.exception.PasswordResetTokenExpired;
import com.devminds.rentify.exception.PasswordResetTokenNotFound;
import com.devminds.rentify.exception.UserNotFoundException;
import com.devminds.rentify.repository.PasswordResetTokenRepository;
import com.devminds.rentify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/rentify/password")
public class PasswordResetTokenController {
    private static final String USER_EMAIL_NOT_FOUND_MESSAGE = "User with email %s not found.";
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public PasswordResetTokenController(UserRepository userRepository, EmailService emailService,
                                        PasswordResetTokenRepository passwordResetTokenRepository,
                                        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestParam("email") String email) {
        // todo maybe in a service
//        if (userService.findByEmail(email).isEmpty()) {
//            throw );
//        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(String.format(USER_EMAIL_NOT_FOUND_MESSAGE, email)));

        String resetTokenValue = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(resetTokenValue);
        resetToken.setExpirationDateTime(LocalDateTime.now().plusMinutes(5)); // maybe todo add more time
        resetToken.setUser(user);
        passwordResetTokenRepository.save(resetToken);

//        String resetLink = "http://localhost:3000/reset-password?email=" + email + "&token=" + resetToken.getToken();
        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken.getToken();
        String emailBody = "Click the following link to reset your password: " + resetLink;
        emailService.sendEmail(email, "Password Reset", emailBody);

        return ResponseEntity.ok("Password reset email sent successfully");
    }

    @PostMapping("/reset-confirm")
    public ResponseEntity<String> resetPasswordConfirm(@RequestParam("token") String token,
                                                       @RequestBody String password) {

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new PasswordResetTokenNotFound("Token not found."));

        if (resetToken.getExpirationDateTime().isBefore(LocalDateTime.now())) {
            throw new PasswordResetTokenExpired("Token has already expired!");
        }

        User user = resetToken.getUser();

//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid or expired token");
//        }

        // Update user's password and clear/reset the reset token
//        System.out.println("ppp "  + password);
        user.setPassword(passwordEncoder.encode(password));
        // Save the updated user
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successfully");
    }

}
