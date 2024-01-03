package com.tiinstore.service.impl;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.sole.FinterSoleRequest;
import com.tiinstore.dto.request.sole.UpdateSoleRequest;
import com.tiinstore.dto.response.SoleResponse;
import com.tiinstore.entity.Sole;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.infrastructure.exception.rest.RestApiException;
import com.tiinstore.repository.SoleReposiory;
import com.tiinstore.service.SoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SoleServiceImpl implements SoleService {

    @Autowired
    private SoleReposiory soleReposiory;

    @Override
    public List<SoleResponse> findAll(FinterSoleRequest request) {
        return soleReposiory.getAll(request);
    }

    @Override
    public Sole add(BaseRequest request) {
        Sole sole = soleReposiory.findByName(request.getName());
        if (sole != null) {
            throw new RestApiException("Đê giày đã tồn tại.");
        }
        Sole add = new Sole();
        add.setName(request.getName());
        add.setStatus(Status.DANG_SU_DUNG);
        return soleReposiory.save(add);
    }

    @Override
    public Sole update(UpdateSoleRequest request) {
        Optional<Sole> optional = soleReposiory.findById(request.getId());
        if (!optional.isPresent()) {
            throw new RestApiException("Đế giày không tồn tại.");
        }
        Sole update = optional.get();
        update.setName(request.getName());
        update.setStatus(request.getStatus());
        soleReposiory.save(update);
        return update;
    }
}
