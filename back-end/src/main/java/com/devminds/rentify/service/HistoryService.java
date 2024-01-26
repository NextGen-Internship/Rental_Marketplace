package com.devminds.rentify.service;

import com.devminds.rentify.dto.HistoryDto;
import com.devminds.rentify.entity.History;
import com.devminds.rentify.repository.HistoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {
    private final HistoryRepository historyRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public HistoryService(HistoryRepository historyRepository, ModelMapper modelMapper) {
        this.historyRepository = historyRepository;
        this.modelMapper = modelMapper;
    }

    public List<HistoryDto> getAllViews() {
        return historyRepository.findAll()
                .stream().map(this::mapHistoryToHistoryDto)
                .toList();
    }

    public List<HistoryDto> getAllViewsByUserId(Long id) {
        return historyRepository.findByUserId(id)
                .stream().map(this::mapHistoryToHistoryDto)
                .toList();
    }

    public List<HistoryDto> getAllViewsByItemId(Long id) {
        return historyRepository.findByItemId(id)
                .stream().map(this::mapHistoryToHistoryDto)
                .toList();
    }

    public HistoryDto addView(HistoryDto historyDto) {
//        History history = mapHistoryDtoToHistory(historyDto);
//        History historyRepository.save(history);
        return null;
    }

    private HistoryDto mapHistoryToHistoryDto(History history) {
        return modelMapper.map(history, HistoryDto.class);
    }

    private History mapHistoryDtoToHistory(HistoryDto historyDto) {
        return modelMapper.map(historyDto, History.class);
    }
}
