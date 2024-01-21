package com.devminds.rentify.service;

import com.devminds.rentify.dto.LikedItemDto;
import com.devminds.rentify.entity.LikedItem;
import com.devminds.rentify.repository.LikedItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikedItemService {
    private final LikedItemRepository likedItemRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public LikedItemService(LikedItemRepository likedItemRepository, ModelMapper modelMapper) {
        this.likedItemRepository = likedItemRepository;
        this.modelMapper = modelMapper;
    }

    public List<LikedItemDto> getAllLikes() {
        return likedItemRepository.findAll()
                .stream()
                .map(this::mapLikedItemToLikedItemDto)
                .toList();
    }

    public List<LikedItemDto> getAllLikesByUserId(Long id) {
        return likedItemRepository.getAllLikesByUserId(id)
                .stream()
                .map(this::mapLikedItemToLikedItemDto)
                .toList();
    }

    public List<LikedItemDto> getAllLikesByItemId(Long id) {
        return likedItemRepository.getAllLikesByItemId(id)
                .stream()
                .map(this::mapLikedItemToLikedItemDto)
                .toList();
    }

    private LikedItemDto mapLikedItemToLikedItemDto(LikedItem likedItem) {
        return modelMapper.map(likedItem, LikedItemDto.class);
    }
}
