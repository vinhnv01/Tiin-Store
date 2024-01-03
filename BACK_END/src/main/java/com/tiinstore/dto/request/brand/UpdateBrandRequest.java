package com.tiinstore.dto.request.brand;

import com.tiinstore.dto.request.base.BaseRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateBrandRequest extends BaseRequest {

    private String id;
}
