package com.tiinstore.service;

import com.tiinstore.dto.request.productdetail.ListImageProductDetailByColor;
import com.tiinstore.dto.request.productdetail.ProductDetailRequestByQuantityAndPrice;
import com.tiinstore.dto.request.productdetail.ProductDetailRequet;
import com.tiinstore.dto.response.ProductDetatilResponse;
import com.tiinstore.dto.response.impldto.ProductDetailResponseDTO;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface ProductDetailService {

    List<ProductDetatilResponse> findAllProductDetail();

    List<ProductDetailResponseDTO> add (ProductDetailRequet productDetailRequet,
                                        List<ProductDetailRequestByQuantityAndPrice> requestByQuantityAndPrices,
                                        List<ListImageProductDetailByColor> listImageProductDetailByColors) throws ExecutionException, InterruptedException;
}
