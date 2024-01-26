package com.devminds.rentify.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/rentify/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("POST" , "PUT" , "DELETE" , "GET")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }

}

