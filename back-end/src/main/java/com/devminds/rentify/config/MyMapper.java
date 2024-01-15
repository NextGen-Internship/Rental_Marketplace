package com.devminds.rentify.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyMapper {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
