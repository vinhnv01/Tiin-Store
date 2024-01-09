package com.tiinstore.dto.response;

import com.tiinstore.dto.response.base.BaseResponse;
import org.springframework.beans.factory.annotation.Value;

public interface ProductResponse extends BaseResponse {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.totalQuantity}")
    Integer getTotalQuantity();
}
