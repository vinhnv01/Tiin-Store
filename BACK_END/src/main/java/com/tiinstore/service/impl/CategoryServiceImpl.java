package com.tiinstore.service.impl;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.category.FinterCategoryRequest;
import com.tiinstore.dto.request.category.UpdateCategoryRequest;
import com.tiinstore.dto.response.CategoryResponse;
import com.tiinstore.entity.Category;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.infrastructure.exception.rest.RestApiException;
import com.tiinstore.repository.CategoryReposiory;
import com.tiinstore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryReposiory categoryReposiory;

    @Override
    public List<CategoryResponse> findAll(FinterCategoryRequest request) {
        return categoryReposiory.getAll(request);
    }

    @Override
    public Category add(BaseRequest request) {
        Category category = categoryReposiory.findByName(request.getName());
        if(category != null) {
            throw new RestApiException("Thể loại đã tồn tại.");
        }
        Category add = new Category();
        add.setName(request.getName());
        add.setStatus(Status.DANG_SU_DUNG);
        return categoryReposiory.save(add);
    }

    @Override
    public Category update(UpdateCategoryRequest request) {
        Optional<Category> optional = categoryReposiory.findById(request.getId());
        if(!optional.isPresent()) {
            throw new RestApiException("Thể loại không tồn tại.");
        }
        Category update = optional.get();
        update.setName(request.getName());
        update.setStatus(request.getStatus());
        categoryReposiory.save(update);
        return update;
    }
}
