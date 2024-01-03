package com.tiinstore.repository;

import com.tiinstore.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, String> {

    @Query("SELECT a FROM Address a WHERE a.status = 'DANG_SU_DUNG' AND a.user.id =:idUser")
    Address findByUserAndStatus (@Param("idUser") String user);
}
