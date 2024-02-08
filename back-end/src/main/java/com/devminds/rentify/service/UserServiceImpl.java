package com.devminds.rentify.service;

import com.devminds.rentify.config.JwtService;
import com.devminds.rentify.dto.UserDto;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.exception.DuplicateEntityException;
import com.devminds.rentify.repository.RoleRepository;
import com.devminds.rentify.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private static final String USER_NOT_FOUND_MESSAGE = "User with %d id not found.";

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;

    @Value("${google-client-key}")
    private String googleClientId;

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


    private GoogleIdToken isValidGoogleToken(String googleCredentials) throws GeneralSecurityException, IOException {
        NetHttpTransport httpTransport = new NetHttpTransport();
        JsonFactory jsonFactory = new GsonFactory();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(httpTransport, jsonFactory)
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken = verifier.verify(googleCredentials);
        return idToken;
    }

    public String mapGoogleTokenToOurToken(String googleCredentials) throws GeneralSecurityException, IOException {
        GoogleIdToken idToken = isValidGoogleToken(googleCredentials);
        if (idToken != null) {
            Payload payload = idToken.getPayload();

            String email = payload.getEmail();
            String familyName = (String) payload.get("family_name");
            String givenName = (String) payload.get("given_name");
            String pictureUrl = (String) payload.get("picture");

            User user = new User();
            user.setEmail(email);
            user.setFirstName(givenName);
            user.setLastName(familyName);
            user.setProfilePicture(pictureUrl);
            user.setRole(this.roleRepository.findUserRole());


            if (this.userRepository.findByEmail(email).isEmpty()) {
                User googleUser = this.userRepository.saveAndFlush(user);
                user.setId(googleUser.getId());
            }
            User existingUser = this.userRepository.findByEmail(email).get();
            user.setId(existingUser.getId());

            return this.jwtService.generateToken(user);

        }
        return null;
    }

}

