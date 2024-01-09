package com.tiinstore.service.impl;

import com.tiinstore.dto.request.size.SizeRequest;
import com.tiinstore.dto.response.SizeResponse;
import com.tiinstore.entity.Size;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.infrastructure.exception.rest.RestApiException;
import com.tiinstore.repository.SizeReposiory;
import com.tiinstore.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeReposiory sizeReposiory;

    @Override
    public List<SizeResponse> findAll() {
        return sizeReposiory.getAll();
    }

    @Override
    public Size add(SizeRequest request) {
        Size size = sizeReposiory.findByName(request.getName());
        if (size != null) {
            throw new RestApiException("Màu sắc đã tồn tại.");
        }
        Size add = new Size();
        add.setName(request.getName());
        add.setStatus(Status.DANG_SU_DUNG);
        return sizeReposiory.save(add);
    }

}
