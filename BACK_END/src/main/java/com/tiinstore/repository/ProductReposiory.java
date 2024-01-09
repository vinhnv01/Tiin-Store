package com.tiinstore.repository;

import com.tiinstore.dto.request.product.FinterProductRequest;
import com.tiinstore.dto.response.ColorResponse;
import com.tiinstore.dto.response.ProductResponse;
import com.tiinstore.entity.Color;
import com.tiinstore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductReposiory extends JpaRepository<Product, String> {

    @Query(value = """
            SELECT ROW_NUMBER() OVER (ORDER BY c.last_modified_date DESC)                      AS stt,
                   c.id                                                                        AS id,
                   c.code                                                                      AS code,
                   c.name                                                                      AS name,
                   c.status                                                                    AS status,
                   (SELECT SUM(pd.quantity) FROM product_detail pd WHERE pd.id_product = c.id ) AS totalQuantity,
                   c.created_date                                                              AS createdDate,
                   c.last_modified_date                                                        AS lastModifiedDate
            FROM product c
            LEFT JOIN product_detail pd ON c.id = pd.id_product
            WHERE  pd.quantity IS NOT NULL
            AND
                ( :#{#rep.name} IS NULL 
                OR :#{#rep.name} LIKE '' 
                OR name LIKE %:#{#rep.name}% ) 
            AND 
                ( :#{#rep.status} IS NULL 
                OR :#{#rep.status} LIKE '' 
                OR c.status LIKE :#{#rep.status} ) 
            GROUP BY c.id, c.last_modified_date
            ORDER BY c.last_modified_date DESC
                        """, nativeQuery = true)
    List<ProductResponse> getAll(FinterProductRequest rep);

    @Query(value = """
            SELECT ROW_NUMBER() OVER (ORDER BY c.last_modified_date DESC)                      AS stt,
                   c.id                                                                        AS id,
                   c.code                                                                      AS code,
                   c.name                                                                      AS name,
                   c.status                                                                    AS status,
                   (SELECT SUM(pd.quantity) FROM product_detail pd WHERE pd.id_product = c.id ) AS totalQuantity,
                   c.created_date                                                              AS createdDate,
                   c.last_modified_date                                                        AS lastModifiedDate
            FROM product c
            LEFT JOIN product_detail pd ON c.id = pd.id_product
            WHERE  
                ( :#{#rep.name} IS NULL 
                OR :#{#rep.name} LIKE '' 
                OR name LIKE %:#{#rep.name}% ) 
            AND 
                ( :#{#rep.status} IS NULL 
                OR :#{#rep.status} LIKE '' 
                OR c.status LIKE :#{#rep.status} ) 
            GROUP BY c.id, c.last_modified_date
            ORDER BY c.last_modified_date DESC
                        """, nativeQuery = true)
    List<ProductResponse> findAllProduct(FinterProductRequest rep);

    Product findByName(String name);

    Product findByCode (String code);
}
