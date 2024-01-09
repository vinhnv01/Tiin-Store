package com.tiinstore.repository;

import com.tiinstore.dto.response.SizeResponse;
import com.tiinstore.entity.Brand;
import com.tiinstore.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SizeReposiory extends JpaRepository<Size, String> {

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER (ORDER BY c.last_modified_date DESC ) AS stt,
                c.id AS id,
                c.name AS name,
                c.status AS status,
                c.created_date AS createdDate,
                c.last_modified_date AS lastModifiedDate
            FROM size c
            ORDER BY c.last_modified_date DESC 
            """, nativeQuery = true)
    List<SizeResponse> getAll();

    Size findByName(String name);
}
