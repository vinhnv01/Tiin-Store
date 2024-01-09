package com.tiinstore.repository;

import com.tiinstore.dto.request.brand.FinterBrandRequest;
import com.tiinstore.dto.response.BrandResponse;
import com.tiinstore.dto.response.ColorResponse;
import com.tiinstore.entity.Brand;
import com.tiinstore.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ColorReposiory extends JpaRepository<Color, String> {

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER (ORDER BY c.last_modified_date DESC ) AS stt,
                c.id AS id,
                c.code AS code,
                c.name AS name,
                c.status AS status,
                c.created_date AS createdDate,
                c.last_modified_date AS lastModifiedDate
            FROM color c
            ORDER BY c.last_modified_date DESC 
            """, nativeQuery = true)
    List<ColorResponse> getAll();

    Color findByName(String name);

    Color findByCode (String code);
}
