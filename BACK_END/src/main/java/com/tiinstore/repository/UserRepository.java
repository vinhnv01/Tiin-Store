package com.tiinstore.repository;

import com.tiinstore.dto.response.CustomerRespone;
import com.tiinstore.dto.response.EmployeeResponse;
import com.tiinstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    User findByEmailAndAndPhoneNumber(String email, String phoneNumber);

    @Query(value = """
            SELECT
                 ROW_NUMBER() OVER (ORDER BY u.last_modified_date DESC ) AS stt,
                 u.id AS idUser,
                 u.full_name AS fullName,
                 u.code AS code,
                 u.email AS email,
                 u.gender AS gender,
                 u.citizen_identity AS citizenIdentity,
                 u.date_of_birth AS dateOfBirth,
                 u.phone_number AS phoneNumber,
                 u.avata AS avata,
                 u.created_date AS createdDate,
                 u.last_modified_date AS lastModifiedDate,
                 u.status AS status,
                 a.id AS idAddress,
                 a.province AS province,
                 a.district AS district,
                 a.ward AS ward,
                 a.line AS line
            FROM user u
            LEFT JOIN address a on u.id = a.id_user
            WHERE a.status = 'DANG_SU_DUNG' AND u.role = 'ROLE_EMLOYEE'
            ORDER BY u.last_modified_date DESC 
            """, nativeQuery = true)
    List<EmployeeResponse> getAllEmployees();

    @Query(value = """
            SELECT
                 ROW_NUMBER() OVER (ORDER BY u.last_modified_date DESC ) AS stt,
                 u.id AS idUser,
                 u.full_name AS fullName,
                 u.code AS code,
                 u.email AS email,
                 u.gender AS gender,
                 u.citizen_identity AS citizenIdentity,
                 u.date_of_birth AS dateOfBirth,
                 u.phone_number AS phoneNumber,
                 u.avata AS avata,
                 u.created_date AS createdDate,
                 u.last_modified_date AS lastModifiedDate,
                 u.status AS status,
                 a.id AS idAddress,
                 a.province AS province,
                 a.district AS district,
                 a.ward AS ward,
                 a.line AS line
            FROM user u
            LEFT JOIN address a on u.id = a.id_user
            WHERE a.status = 'DANG_SU_DUNG' AND u.role = 'ROLE_EMLOYEE' AND u.id = :id
            """,nativeQuery = true)
    EmployeeResponse findByIdEmployee (@Param("id") String id);

    @Query(value = """
            SELECT
                 ROW_NUMBER() OVER (ORDER BY u.last_modified_date DESC ) AS stt,
                 u.id AS idUser,
                 u.full_name AS fullName,
                 u.code AS code,
                 u.email AS email,
                 u.gender AS gender,
                 u.citizen_identity AS citizenIdentity,
                 u.date_of_birth AS dateOfBirth,
                 u.phone_number AS phoneNumber,
                 u.avata AS avata,
                 u.created_date AS createdDate,
                 u.last_modified_date AS lastModifiedDate,
                 u.status AS status,
                 a.id AS idAddress,
                 a.province AS province,
                 a.district AS district,
                 a.ward AS ward,
                 a.line AS line
            FROM user u
            LEFT JOIN address a on u.id = a.id_user
            WHERE a.status = 'DANG_SU_DUNG' AND u.role = 'ROLE_USER'
            ORDER BY u.last_modified_date DESC 
            """, nativeQuery = true)
    List<CustomerRespone> getAllCustomer();

    @Query(value = """
            SELECT
                 ROW_NUMBER() OVER (ORDER BY u.last_modified_date DESC ) AS stt,
                 u.id AS idUser,
                 u.full_name AS fullName,
                 u.code AS code,
                 u.email AS email,
                 u.gender AS gender,
                 u.citizen_identity AS citizenIdentity,
                 u.date_of_birth AS dateOfBirth,
                 u.phone_number AS phoneNumber,
                 u.avata AS avata,
                 u.created_date AS createdDate,
                 u.last_modified_date AS lastModifiedDate,
                 u.status AS status,
                 a.id AS idAddress,
                 a.province AS province,
                 a.district AS district,
                 a.ward AS ward,
                 a.line AS line
            FROM user u
            LEFT JOIN address a on u.id = a.id_user
            WHERE a.status = 'DANG_SU_DUNG' AND u.role = 'ROLE_USER' AND u.id = :id
            """,nativeQuery = true)
    CustomerRespone findByIdCustomer (@Param("id") String id);

}
