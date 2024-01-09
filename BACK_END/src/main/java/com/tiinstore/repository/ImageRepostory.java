package com.tiinstore.repository;

import com.tiinstore.entity.Image;
import com.tiinstore.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepostory extends JpaRepository<Image,String> {
}
