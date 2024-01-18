package com.devminds.rentify.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity //Enable web security features
public class AuthConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests(auth -> auth
//                .requestMatchers("/rentify/categories").permitAll()
//                .requestMatchers("/rentify/categories/*").permitAll()
//                .requestMatchers("/rentify/items").permitAll()
//                .requestMatchers("/rentify/items/*").permitAll()
//                .requestMatchers("/file/upload").permitAll()
////                .requestMatchers("/h2/**").permitAll()
//                .anyRequest().authenticated());
//        return http.build();
        http.authorizeHttpRequests(authorizeRequests -> authorizeRequests.requestMatchers(HttpMethod.POST, "/file/upload").permitAll().anyRequest()
                .permitAll());
        return http.build();
    }
}