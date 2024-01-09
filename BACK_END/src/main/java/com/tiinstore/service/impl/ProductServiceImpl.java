package com.tiinstore.service.impl;

import com.tiinstore.dto.request.color.ColorRequest;
import com.tiinstore.dto.request.product.FinterProductRequest;
import com.tiinstore.dto.request.product.ProdcutRequest;
import com.tiinstore.dto.response.ColorResponse;
import com.tiinstore.dto.response.ProductResponse;
import com.tiinstore.entity.Color;
import com.tiinstore.entity.Product;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.infrastructure.exception.rest.RestApiException;
import com.tiinstore.repository.ColorReposiory;
import com.tiinstore.repository.ProductReposiory;
import com.tiinstore.service.ColorService;
import com.tiinstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductReposiory productReposiory;

    @Override
    public List<ProductResponse> findAll(FinterProductRequest rep) {
        return productReposiory.getAll( rep);
    }

    @Override
    public List<ProductResponse> getAll(FinterProductRequest rep) {
        return productReposiory.findAllProduct(rep);
    }

    @Override
    public Product add(ProdcutRequest request) {
        Product product = productReposiory.findByCode(request.getName());
        if (product != null) {
            throw new RestApiException("Màu sắc đã tồn tại.");
        }
        Product add = new Product();
        add.setName(request.getName());
        add.setCode(request.getCode());
        add.setStatus(Status.DANG_SU_DUNG);
        return productReposiory.save(add);
    }

}
