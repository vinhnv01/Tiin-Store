package com.tiinstore.service;

import com.tiinstore.dto.request.color.ColorRequest;
import com.tiinstore.dto.response.ColorResponse;
import com.tiinstore.entity.Color;

import java.util.List;

public interface ColorService {

    List<ColorResponse> findAll();

    Color add(ColorRequest request);

}
