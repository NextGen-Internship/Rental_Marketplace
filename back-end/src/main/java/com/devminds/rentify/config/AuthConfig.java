package com.devminds.rentify.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity //Enable web security features
public class AuthConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/rentify/categories").permitAll()
                .requestMatchers("/rentify/categories/*").permitAll()
                .requestMatchers("/rentify/items").permitAll()
                .requestMatchers("/rentify/items/*").permitAll()
//                .requestMatchers("/h2/**").permitAll()
                .anyRequest().authenticated());
        return http.build();
    }
}