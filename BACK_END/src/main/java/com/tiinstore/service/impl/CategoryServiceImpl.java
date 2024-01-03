package com.tiinstore.service.impl;

import com.tiinstore.dto.request.category.CategoryRequest;
import com.tiinstore.dto.response.CategoryResponse;
import com.tiinstore.entity.Category;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.infrastructure.exception.rest.RestApiException;
import com.tiinstore.repository.CategoryReposiory;
import com.tiinstore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryReposiory categoryReposiory;

    @Override
    public List<CategoryResponse> findAll() {
        return categoryReposiory.getAll();
    }

    @Override
    public Category add(CategoryRequest request) {
        Category category = categoryReposiory.findByName(request.getName());
        if(category != null) {
            throw new RestApiException("Thể loại đã tồn tại.");
        }
        Category add = new Category();
        add.setName(request.getName());
        add.setStatus(Status.DANG_SU_DUNG);
        return categoryReposiory.save(add);
    }
}
