package com.tiinstore.repository;

import com.tiinstore.dto.request.material.FinterMaterialRequest;
import com.tiinstore.dto.response.MaterialResponse;
import com.tiinstore.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MaterialReposiory extends JpaRepository<Material, String> {

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER (ORDER BY c.last_modified_date DESC ) AS stt,
                c.id AS id,
                c.name AS name,
                c.status AS status,
                c.created_date AS createdDate,
                c.last_modified_date AS lastModifiedDate
            FROM material c
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
    List<MaterialResponse> getAll(FinterMaterialRequest rep);

    Material findByName(String name);
}
