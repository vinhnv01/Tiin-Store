package com.tiinstore.service;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.category.FinterCategoryRequest;
import com.tiinstore.dto.request.category.UpdateCategoryRequest;
import com.tiinstore.dto.response.CategoryResponse;
import com.tiinstore.entity.Category;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> findAll(FinterCategoryRequest request);
    Category add ( BaseRequest request);
    Category update (UpdateCategoryRequest request);

}
