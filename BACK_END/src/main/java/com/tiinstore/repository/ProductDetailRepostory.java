package com.tiinstore.repository;

import com.tiinstore.dto.response.ProductDetatilResponse;
import com.tiinstore.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailRepostory extends JpaRepository<ProductDetail,String> {

    @Query(value = """
            SELECT ROW_NUMBER() OVER (ORDER BY detail.last_modified_date DESC) AS stt,
                   detail.id                                                   AS idProductDetail,
                   CONCAT(p.name, '[ ', s2.name, ' - ', c2.name, ' ]')         AS nameProductDetail,
                   max_images.nameUrl                                          AS imageProductDetail,
                   detail.quantity                                             AS totalQuantity,
                   s.name                                                      AS idSole,
                   c.name                                                      AS idCategory,
                   m.name                                                      AS idMateral,
                   c2.id                                                       AS idColor,
                   c2.code                                                     AS codeColor,
                   s2.name                                                     AS idSize,
                   b.name                                                      AS idBrand,
                   p.name                                                      AS idProduct,
                   detail.gender                                               AS gender,
                   detail.status                                               AS status,
                   detail.created_date                                         AS createdDate,
                   detail.last_modified_date                                   AS lastModifiedDate
            FROM product_detail detail
                     JOIN sole s on detail.id_sole = s.id
                     JOIN category c on detail.id_category = c.id
                     JOIN material m on detail.id_material = m.id
                     JOIN color c2 on detail.id_color = c2.id
                     JOIN size s2 on detail.id_size = s2.id
                     JOIN brand b on detail.id_brand = b.id
                     JOIN product p on detail.id_product = p.id
                     JOIN (SELECT ia.id_product_detail, MAX(ia.name) AS nameUrl
                           FROM image ia
                           GROUP BY ia.id_product_detail) max_images ON detail.id = max_images.id_product_detail

            """, nativeQuery = true)
    List<ProductDetatilResponse> findAllProductDetail ();
}
