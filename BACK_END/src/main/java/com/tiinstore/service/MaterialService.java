package com.tiinstore.service;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.material.FinterMaterialRequest;
import com.tiinstore.dto.request.material.UpdateMaterialRequest;
import com.tiinstore.dto.response.MaterialResponse;
import com.tiinstore.entity.Material;

import java.util.List;

public interface MaterialService {

    List<MaterialResponse> findAll(FinterMaterialRequest request);

    Material add(BaseRequest request);

    Material update(UpdateMaterialRequest request);

}
