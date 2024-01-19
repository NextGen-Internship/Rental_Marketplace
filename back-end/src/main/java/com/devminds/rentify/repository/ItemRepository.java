package com.devminds.rentify.repository;

import com.devminds.rentify.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public interface ItemRepository extends JpaRepository<Item, Integer> {
    List<Item> findByCategoryId(Long id);
}
