package com.tiinstore.dto.request.material;

import com.tiinstore.dto.request.base.BaseRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateMaterialRequest extends BaseRequest {

    private String id;
}
