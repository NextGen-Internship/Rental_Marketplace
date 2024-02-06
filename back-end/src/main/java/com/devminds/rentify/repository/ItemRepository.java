package com.devminds.rentify.repository;

import com.devminds.rentify.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> , JpaSpecificationExecutor<Item>  {
    List<Item> findByCategoryId(Long id);
    Page<Item> findByCategoryId(Long id, Pageable pageable);
}
