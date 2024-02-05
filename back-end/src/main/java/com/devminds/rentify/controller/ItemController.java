package com.devminds.rentify.controller;

import com.devminds.rentify.dto.CreateItemDto;
import com.devminds.rentify.dto.ItemDto;
import com.devminds.rentify.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/rentify/items")
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/create")
    public void createItem(@ModelAttribute CreateItemDto createItemDto) throws IOException {
        this.itemService.saveItem(createItemDto);
    }

    //    @GetMapping
//    public ResponseEntity<List<ItemDto>> getAllItems(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "2") int size) {
//
//        Pageable pageable = PageRequest.of(page, size);
//        return ResponseEntity.ok(itemService.getAllItems(pageable));
//    }
    @GetMapping
    public ResponseEntity<Page<ItemDto>> getAllItems(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "2") int size) {
        Page<ItemDto> items = itemService.getAllItems(PageRequest.of(page, size));
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

//    @GetMapping("/category/{id}")
//    public ResponseEntity<List<ItemDto>> getItemsByCategoryId(@PathVariable Long id) {
//        return ResponseEntity.ok(itemService.getItemsByCategoryId(id));
//    }
    @GetMapping("/category/{id}")
    public ResponseEntity<Page<ItemDto>> getItemsByCategoryId(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size) {

        Page<ItemDto> items = itemService.getItemsByCategoryId(id, PageRequest.of(page, size));
        return ResponseEntity.ok(items);
    }
}
