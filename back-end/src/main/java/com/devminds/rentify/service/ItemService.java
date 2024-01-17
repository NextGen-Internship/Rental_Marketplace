package com.devminds.rentify.service;

import com.devminds.rentify.dto.CreateItemDto;
import com.devminds.rentify.entity.Item;
import com.devminds.rentify.repository.ItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    private final ModelMapper modelMapper;

    public ItemService(ItemRepository itemRepository, ModelMapper modelMapper) {
        this.itemRepository = itemRepository;
        this.modelMapper = modelMapper;
    }

    public Item saveItem(CreateItemDto createItemDto) {
     Item itemToSave = this.modelMapper.map(createItemDto,Item.class);

        return this.itemRepository.save(itemToSave);
    }


}
