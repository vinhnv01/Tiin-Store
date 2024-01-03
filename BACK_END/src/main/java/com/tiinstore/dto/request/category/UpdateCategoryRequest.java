package com.tiinstore.dto.request.category;

import com.tiinstore.dto.request.base.BaseRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateCategoryRequest extends BaseRequest {

    private String id;
}
