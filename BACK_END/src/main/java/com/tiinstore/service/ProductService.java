package com.tiinstore.service;

import com.tiinstore.dto.request.product.FinterProductRequest;
import com.tiinstore.dto.request.product.ProdcutRequest;
import com.tiinstore.dto.response.ProductResponse;
import com.tiinstore.entity.Product;

import java.util.List;

public interface ProductService {

    List<ProductResponse> findAll(FinterProductRequest rep);
    List<ProductResponse> getAll(FinterProductRequest rep);

    Product add(ProdcutRequest request);

}
