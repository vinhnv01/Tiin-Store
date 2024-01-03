package com.tiinstore.dto.response.base;

import org.springframework.beans.factory.annotation.Value;

public interface BaseUserResponse {

    @Value("#{target.stt}")
    Integer getSTT();

    @Value("#{target.idUser}")
    String getIdUser();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.createdDate}")
    Long getCreatedDate();

    @Value("#{target.lastModifiedDate}")
    Long getLastModifiedDate();

    @Value("#{target.avata}")
    String getAvata();

    @Value("#{target.phoneNumber}")
    String getPhoneNumber();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.dateOfBirth}")
    Long getDateOfBirth();

    @Value("#{target.fullName}")
    String getFullName();

    @Value("#{target.gender}")
    String getGender();

    @Value("#{target.citizenIdentity}")
    String getCitizenIdentity();


    // todo: address
    @Value("#{target.idAddress}")
    String getIdAddress();

    @Value("#{target.province}")
    String getProvince();

    @Value("#{target.district}")
    String getDistrict();

    @Value("#{target.ward}")
    String getWard();

    @Value("#{target.line}")
    String getLine();
}
