package com.devminds.rentify.auth;
import com.devminds.rentify.configuration.JwtService;
import com.devminds.rentify.entity.Address;
import com.devminds.rentify.entity.Role;
import com.devminds.rentify.entity.User;
import com.devminds.rentify.enums.UserRole;
import com.devminds.rentify.exception.UserNotFoundException;
import com.devminds.rentify.repository.AddressRepository;
import com.devminds.rentify.repository.RoleRepository;
import com.devminds.rentify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;


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
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;
    private final AddressRepository addressRepository;
    private final RoleRepository roleRepository;


    public AuthenticationRespone  register (UserRegisterDto userRegisterDto){

        var addresses = convertToAddressEntities(userRegisterDto.getAddresses());
        addressRepository.saveAll(addresses);

        var role = new Role(UserRole.USER);
        roleRepository.save(role);


        User user = userMapper.mapToUser(userRegisterDto);
        user.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));
        user.setAddresses(addresses);
        user.setRole(role);

        userRepository.save(user);

        var token = jwtService.generateToken(user);
        return AuthenticationRespone.builder()
                .token(token)
                .email(user.getEmail()).build();
    }

    private List<Address> convertToAddressEntities(List<AddressDto> addressDtos) {
   return     addressDtos.stream()
                .map(addressMapper::mapToAddress)
              .collect(Collectors.toList());
    }


    public AuthenticationRespone login(LoginDto loginDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );

            var user = userRepository.findByEmail(loginDto.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

            var token = jwtService.generateToken(user);
            return AuthenticationRespone.builder()
                    .token(token)
                    .email(user.getEmail())
                    .build();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
}
