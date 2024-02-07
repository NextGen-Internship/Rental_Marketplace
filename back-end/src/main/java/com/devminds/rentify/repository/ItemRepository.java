package com.devminds.rentify.repository;

import com.devminds.rentify.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public interface ItemRepository extends JpaRepository<Item, Long> , JpaSpecificationExecutor<Item>  {
    List<Item> findByCategoryId(Long id);
    List<Item> findByUserId(Long userId);
}
