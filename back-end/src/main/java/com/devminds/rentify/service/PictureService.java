package com.devminds.rentify.service;

import com.devminds.rentify.dto.PictureDto;
import com.devminds.rentify.entity.Picture;
import com.devminds.rentify.exception.PictureNotFoundException;
import com.devminds.rentify.repository.PictureRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class PictureService {
    private static final String PICTURE_NOT_FOUND_MESSAGE = "Picture with %d id not found.";

    private final StorageService storageService;
    private final PictureRepository pictureRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PictureService(StorageService storageService, PictureRepository pictureRepository, ModelMapper modelMapper) {
        this.storageService = storageService;
        this.pictureRepository = pictureRepository;
        this.modelMapper = modelMapper;
    }

    public List<PictureDto> getAllPictures() {
        return pictureRepository.findAll()
                .stream()
                .map(this::mapPictureToPictureDto)
                .toList();
    }

    public PictureDto getPictureById(Long id) {
        return pictureRepository.findById(id)
                .map(this::mapPictureToPictureDto)
                .orElseThrow(() -> new PictureNotFoundException(String.format(PICTURE_NOT_FOUND_MESSAGE, id)));
    }

    public List<PictureDto> getPicturesByItemId(Long id) {
        return pictureRepository.findByItemId(id)
                .stream()
                .map(this::mapPictureToPictureDto)
                .toList();
    }

    public List<PictureDto> getThumbnails() {
        return pictureRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(Picture::getItem,
                        Collectors.collectingAndThen(
                                Collectors.minBy(Comparator.comparingLong(Picture::getId)),
                                optional -> optional.map(this::mapPictureToPictureDto).orElse(null))))
                .values()
                .stream()
                .filter(Objects::nonNull)
                .sorted(Comparator.comparing(p -> p.getItem().getId()))
                .collect(Collectors.toList());
    }

    private PictureDto mapPictureToPictureDto(Picture picture) {
        return modelMapper.map(picture, PictureDto.class);
    }
}
