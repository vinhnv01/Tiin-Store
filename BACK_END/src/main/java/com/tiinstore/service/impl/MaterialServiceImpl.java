package com.tiinstore.service.impl;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.material.FinterMaterialRequest;
import com.tiinstore.dto.request.material.UpdateMaterialRequest;
import com.tiinstore.dto.response.MaterialResponse;
import com.tiinstore.entity.Material;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.infrastructure.exception.rest.RestApiException;
import com.tiinstore.repository.MaterialReposiory;
import com.tiinstore.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialReposiory materialReposiory;

    @Override
    public List<MaterialResponse> findAll(FinterMaterialRequest request) {
        return materialReposiory.getAll(request);
    }

    @Override
    public Material add(BaseRequest request) {
        Material material = materialReposiory.findByName(request.getName());
        if (material != null) {
            throw new RestApiException("Thể loại đã tồn tại.");
        }
        Material add = new Material();
        add.setName(request.getName());
        add.setStatus(Status.DANG_SU_DUNG);
        return materialReposiory.save(add);
    }

    @Override
    public Material update(UpdateMaterialRequest request) {
        Optional<Material> optional = materialReposiory.findById(request.getId());
        if (!optional.isPresent()) {
            throw new RestApiException("Thể loại không tồn tại.");
        }
        Material update = optional.get();
        update.setName(request.getName());
        update.setStatus(request.getStatus());
        materialReposiory.save(update);
        return update;
    }
}
