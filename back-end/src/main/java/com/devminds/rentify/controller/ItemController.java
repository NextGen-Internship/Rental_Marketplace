package com.devminds.rentify.controller;

import com.devminds.rentify.dto.CreateItemDto;
import com.devminds.rentify.dto.ItemDto;
import com.devminds.rentify.entity.Item;
import com.devminds.rentify.service.ItemService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<ItemDto>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<ItemDto>> getItemsByCategoryId(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemsByCategoryId(id));
    }

    @GetMapping("/filter")
    public List<Item> getFilteredItems(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Float priceFrom,
            @RequestParam(required = false) Float priceTo,
            @RequestParam(required = false) String address) {

        // Your logic to filter items based on parameters
        // Use category, priceFrom, priceTo, address as needed


        System.out.println("poluchih coleee categoriq " +category );
        System.out.println("poluchih coleee  cena ot " +priceFrom );
        System.out.println("poluchih coleee cena do  " +priceTo );
        System.out.println("poluchih coleee  graddd za jiveeene // " + address );

        if (address == null){
            System.out.println("null e e ");
        }

        // Example response (replace this with your actual logic)
        List<Item> filteredItems = itemService.getFilteredItems(category, priceFrom, priceTo, address);
        return filteredItems;
    }
}
