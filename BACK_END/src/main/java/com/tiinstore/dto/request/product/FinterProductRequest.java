package com.tiinstore.dto.request.product;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FinterProductRequest {

    private String name;

    private String status;

    private int maxQuantity;

    private int minQuantity;
}
