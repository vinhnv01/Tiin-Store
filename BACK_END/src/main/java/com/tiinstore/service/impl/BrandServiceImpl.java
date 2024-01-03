package com.tiinstore.service.impl;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.brand.FinterBrandRequest;
import com.tiinstore.dto.request.brand.UpdateBrandRequest;
import com.tiinstore.dto.response.BrandResponse;
import com.tiinstore.entity.Brand;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.infrastructure.exception.rest.RestApiException;
import com.tiinstore.repository.BrandReposiory;
import com.tiinstore.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandReposiory brandReposiory;

    @Override
    public List<BrandResponse> findAll(FinterBrandRequest request) {
        return brandReposiory.getAll(request);
    }

    @Override
    public Brand add(BaseRequest request) {
        Brand brand = brandReposiory.findByName(request.getName());
        if (brand != null) {
            throw new RestApiException("Thể loại đã tồn tại.");
        }
        Brand add = new Brand();
        add.setName(request.getName());
        add.setStatus(Status.DANG_SU_DUNG);
        return brandReposiory.save(add);
    }

    @Override
    public Brand update(UpdateBrandRequest request) {
        Optional<Brand> optional = brandReposiory.findById(request.getId());
        if (!optional.isPresent()) {
            throw new RestApiException("Thể loại không tồn tại.");
        }
        Brand update = optional.get();
        update.setName(request.getName());
        update.setStatus(request.getStatus());
        brandReposiory.save(update);
        return update;
    }
}
