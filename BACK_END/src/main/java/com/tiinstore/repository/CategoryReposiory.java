package com.tiinstore.repository;

import com.tiinstore.dto.request.category.FinterCategoryRequest;
import com.tiinstore.dto.response.CategoryResponse;
import com.tiinstore.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CategoryReposiory extends JpaRepository<Category, String> {

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER (ORDER BY c.last_modified_date DESC ) AS stt,
                c.id AS id,
                c.name AS name,
                c.status AS status,
                c.created_date AS createdDate,
                c.last_modified_date AS lastModifiedDate
            FROM category c
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
    List<CategoryResponse> getAll(FinterCategoryRequest rep);

    Category findByName(String name);
}
