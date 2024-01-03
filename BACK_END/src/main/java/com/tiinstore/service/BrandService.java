package com.tiinstore.service;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.brand.FinterBrandRequest;
import com.tiinstore.dto.request.brand.UpdateBrandRequest;
import com.tiinstore.dto.response.BrandResponse;
import com.tiinstore.entity.Brand;

import java.util.List;

public interface BrandService {

    List<BrandResponse> findAll(FinterBrandRequest request);

    Brand add(BaseRequest request);

    Brand update(UpdateBrandRequest request);

}
