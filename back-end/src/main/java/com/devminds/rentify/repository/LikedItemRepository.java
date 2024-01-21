package com.devminds.rentify.repository;

import com.devminds.rentify.entity.LikedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikedItemRepository extends JpaRepository<LikedItem, Long> {
    List<LikedItem> getAllLikesByUserId(Long id);

    List<LikedItem> getAllLikesByItemId(Long id);
}
