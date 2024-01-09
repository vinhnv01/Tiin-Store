package com.tiinstore.dto.request.productdetail;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class ProductDetailRequestByQuantityAndPrice {

    private String barcode;

    private String key;

    private String size;

    private String color;

    private BigDecimal price;

    private Integer quantity;
}
