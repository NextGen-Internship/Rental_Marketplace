package com.devminds.rentify.repository;

import com.devminds.rentify.entity.Item;
import com.devminds.rentify.entity.LikedItem;
import com.devminds.rentify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikedItemRepository extends JpaRepository<LikedItem , Integer> {

    List<LikedItem> findByItem(Item item);

    List<LikedItem> findByUser(User user);

    boolean existsByUserAndItem(User user, Item item);

    void deleteByUserAndItem(User user, Item item);
}