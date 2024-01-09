package com.tiinstore.dto.response;

import com.tiinstore.dto.response.base.BaseResponse;
import org.springframework.beans.factory.annotation.Value;

public interface ColorResponse extends BaseResponse {

    @Value("#{target.code}")
    String getCode();
}
