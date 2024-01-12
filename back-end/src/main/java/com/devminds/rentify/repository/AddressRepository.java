package com.devminds.rentify.repository;

import com.devminds.rentify.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address , Integer> {
}
