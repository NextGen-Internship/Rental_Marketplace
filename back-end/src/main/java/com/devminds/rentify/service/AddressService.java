package com.devminds.rentify.service;

import com.devminds.rentify.entity.Address;
import com.devminds.rentify.exception.AddressNotFoundException;
import com.devminds.rentify.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {
    private static final String ADDRESS_NOT_FOUND_MESSAGE = "Category with %d id not found.";
    private final AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    public Address getAddressById(int id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new AddressNotFoundException(String.format(ADDRESS_NOT_FOUND_MESSAGE, id)));
    }

    public List<Address> getAddressesByCity(String city) {
        return addressRepository.findByCity(city);
    }

    public List<Address> getAddressesByPostCode(String postalCode) {
        return addressRepository.findByPostCode(postalCode);
    }

    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }

    public void deleteAddressById(int id) {
        addressRepository.deleteById(id);
    }
}
