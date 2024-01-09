package com.tiinstore.dto.response;

import org.springframework.beans.factory.annotation.Value;

public interface ProductDetatilResponse {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.idProductDetail}")
    String getId();

    @Value("#{target.nameProductDetail}")
    String getNameProductDetail();

    @Value("#{target.imageProductDetail}")
    String getImageProductDetail();

    @Value("#{target.totalQuantity}")
    String getTotalQuantity();

    @Value("#{target.idSize}")
    String getIdSize();

    @Value("#{target.idColor}")
    String getIdColor();

    @Value("#{target.codeColor}")
    String getCodeColor();

    @Value("#{target.idMateral}")
    String getIdMateral();

    @Value("#{target.idBrand}")
    String getIdBrand();

    @Value("#{target.idSole}")
    String getIdSole();

    @Value("#{target.gender}")
    String getGender();

    @Value("#{target.idCategory}")
    String getIdCategory();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.createdDate}")
    Long getCreatedDate();

    @Value("#{target.lastModifiedDate}")
    Long getLastModifiedDate();
}
