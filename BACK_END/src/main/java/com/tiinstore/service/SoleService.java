package com.tiinstore.service;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.category.FinterCategoryRequest;
import com.tiinstore.dto.request.category.UpdateCategoryRequest;
import com.tiinstore.dto.request.sole.FinterSoleRequest;
import com.tiinstore.dto.request.sole.UpdateSoleRequest;
import com.tiinstore.dto.response.CategoryResponse;
import com.tiinstore.dto.response.SoleResponse;
import com.tiinstore.entity.Category;
import com.tiinstore.entity.Sole;

import java.util.List;

public interface SoleService {

    List<SoleResponse> findAll(FinterSoleRequest request);
    Sole add (BaseRequest request);
    Sole update (UpdateSoleRequest request);

}
