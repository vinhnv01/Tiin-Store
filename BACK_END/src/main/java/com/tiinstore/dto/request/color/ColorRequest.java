package com.tiinstore.dto.request.color;

import com.tiinstore.dto.request.base.BaseRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ColorRequest extends BaseRequest {

    private String code;
}
