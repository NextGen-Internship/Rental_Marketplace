package com.devminds.rentify.controller;

import com.devminds.rentify.dto.HistoryDto;
import com.devminds.rentify.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rentify/views")
public class HistoryController {
    private final HistoryService historyService;

    @Autowired
    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public ResponseEntity<List<HistoryDto>> getAllViews() {
        return new ResponseEntity<>(historyService.getAllViews(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<HistoryDto>> getAllViewsByUserId(@PathVariable Long id) {
        return new ResponseEntity<>(historyService.getAllViewsByUserId(id), HttpStatus.OK);
    }

    @GetMapping("/user-email/{email}")
    public ResponseEntity<List<HistoryDto>> getAllViewsByUserEmail(@PathVariable String email) {
        return new ResponseEntity<>(historyService.getAllViewsByUserEmail(email), HttpStatus.OK);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<List<HistoryDto>> getAllViewsByItemId(@PathVariable Long id) {
        return new ResponseEntity<>(historyService.getAllViewsByItemId(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<HistoryDto> addView(@RequestBody HistoryDto historyDto) {
        return new ResponseEntity<>(historyService.addView(historyDto), HttpStatus.OK);
    }
}
