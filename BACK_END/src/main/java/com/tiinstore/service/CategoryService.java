package com.tiinstore.service;

import com.tiinstore.dto.request.category.CategoryRequest;
import com.tiinstore.dto.response.CategoryResponse;
import com.tiinstore.entity.Category;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> findAll();
    Category add ( CategoryRequest request);
}
