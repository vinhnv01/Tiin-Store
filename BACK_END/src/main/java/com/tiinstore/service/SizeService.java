package com.tiinstore.service;

import com.tiinstore.dto.request.size.SizeRequest;
import com.tiinstore.dto.response.SizeResponse;
import com.tiinstore.entity.Size;

import java.util.List;

public interface SizeService {

    List<SizeResponse> findAll();

    Size add(SizeRequest request);

}
