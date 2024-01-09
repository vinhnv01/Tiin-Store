package com.tiinstore.dto.request.product;

import com.tiinstore.dto.request.base.BaseRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProdcutRequest extends BaseRequest {

    private String code;
}
