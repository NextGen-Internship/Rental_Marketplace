package com.devminds.rentify.controller;

import com.devminds.rentify.dto.CreateItemDto;
import com.devminds.rentify.service.ItemService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/rentify")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/create")
    public void createItem(@RequestBody CreateItemDto createItemDto) {
     this.itemService.saveItem(createItemDto);
    }

}
