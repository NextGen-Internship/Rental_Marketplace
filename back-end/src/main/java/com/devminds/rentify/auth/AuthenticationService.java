package com.devminds.rentify.auth;
import com.devminds.rentify.configuration.JwtService;
import com.devminds.rentify.entity.Address;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.repository.AddressRepository;
import com.devminds.rentify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class

AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final AddressRepository addressRepository;


    public AuthenticationRespone  register (UserRegisterDto userRegisterDto){

        var addresses = convertToAddressEntities(userRegisterDto.getAddresses());

        addressRepository.saveAll(addresses);
        
        var user = User.builder().firstName(userRegisterDto.getFirstName())
                .lastName(userRegisterDto.getLastName())
                .email(userRegisterDto.getEmail())
                .password(passwordEncoder.encode(userRegisterDto.getPassword()))
                .phoneNumber(userRegisterDto.getPhoneNumber())
                .addresses(addresses)
                .build();



        userRepository.save(user);

        var token = jwtService.generateToken(user);
        return AuthenticationRespone.builder()
                .token(token).build();
    }

    private List<Address> convertToAddressEntities(List<AddressDto> addressDtos) {
   return     addressDtos.stream()
                .map(addressDto -> Address.builder()
                        .city(addressDto.getCity())
                        .street(addressDto.getStreet())
                        .postCode(addressDto.getPostCode())
                        .streetNumber(addressDto.getStreetNumber())
                        .build())
              .collect(Collectors.toList());
    }


    public AuthenticationRespone  login (LoginDto loginDto){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail() , loginDto.getPassword())
        );
        var user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow();
        var token = jwtService.generateToken(user);
        return AuthenticationRespone.builder()
                .token(token).build();
    }
}
