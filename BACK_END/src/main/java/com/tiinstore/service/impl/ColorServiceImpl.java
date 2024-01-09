package com.tiinstore.service.impl;

import com.tiinstore.dto.request.color.ColorRequest;
import com.tiinstore.dto.response.ColorResponse;
import com.tiinstore.entity.Color;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.infrastructure.exception.rest.RestApiException;
import com.tiinstore.repository.ColorReposiory;
import com.tiinstore.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorReposiory colorReposiory;

    @Override
    public List<ColorResponse> findAll() {
        return colorReposiory.getAll();
    }

    @Override
    public Color add(ColorRequest request) {
        Color brand = colorReposiory.findByCode(request.getName());
        if (brand != null) {
            throw new RestApiException("Màu sắc đã tồn tại.");
        }
        Color add = new Color();
        add.setName(request.getName());
        add.setCode(request.getCode());
        add.setStatus(Status.DANG_SU_DUNG);
        return colorReposiory.save(add);
    }

}
