package com.tiinstore.repository;

import com.tiinstore.dto.request.brand.FinterBrandRequest;
import com.tiinstore.dto.response.BrandResponse;
import com.tiinstore.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BrandReposiory extends JpaRepository<Brand, String> {

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER (ORDER BY c.last_modified_date DESC ) AS stt,
                c.id AS id,
                c.name AS name,
                c.status AS status,
                c.created_date AS createdDate,
                c.last_modified_date AS lastModifiedDate
            FROM brand c
            WHERE 
                ( :#{#rep.name} IS NULL 
                    OR :#{#rep.name} LIKE '' 
                    OR name LIKE %:#{#rep.name}% ) 
            AND 
                ( :#{#rep.status} IS NULL 
                    OR :#{#rep.status} LIKE '' 
                    OR c.status LIKE :#{#rep.status} ) 
            ORDER BY c.last_modified_date DESC 
            """, nativeQuery = true)
    List<BrandResponse> getAll(FinterBrandRequest rep);

    Brand findByName(String name);
}
