package com.tiinstore.repository;

import com.tiinstore.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, String> {

    Address findByUserAnAndStatus (String user, String status);
}
