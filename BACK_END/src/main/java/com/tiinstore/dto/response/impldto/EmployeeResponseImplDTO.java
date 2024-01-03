package com.tiinstore.dto.response.impldto;

import com.tiinstore.entity.Address;
import com.tiinstore.entity.User;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EmployeeResponseImplDTO {
    private Integer stt;
    private String idUser;
    private String code;
    private String email;
    private Long createdDate;
    private Long lastModifiedDate;
    private String avata;
    private String phoneNumber;
    private String status;
    private Long dateOfBirth;
    private String fullName;
    private Boolean gender;
    private String citizenIdentity;
    private String idAddress;
    private String province;
    private String district;
    private String ward;
    private String line;

    public EmployeeResponseImplDTO(User user, Address address) {
        this.idUser = user.getId();
        this.email = user.getEmail();
        this.code = user.getCode();
        this.createdDate = user.getCreatedDate();
        this.lastModifiedDate = user.getLastModifiedDate();
        this.avata = user.getAvata();
        this.phoneNumber = user.getPhoneNumber();
        this.status = user.getStatus().name();
        this.dateOfBirth = user.getDateOfBirth();
        this.fullName = user.getFullName();
        this.gender = user.getGender();
        this.citizenIdentity = user.getCitizenIdentity();
        this.idAddress = address.getId();
        this.province = address.getProvince();
        this.district = address.getDistrict();
        this.ward = address.getWard();
        this.line = address.getLine();
    }

    public EmployeeResponseImplDTO(User user) {
        this.idUser = user.getId();
        this.email = user.getEmail();
        this.code = user.getCode();
        this.createdDate = user.getCreatedDate();
        this.lastModifiedDate = user.getLastModifiedDate();
        this.avata = user.getAvata();
        this.phoneNumber = user.getPhoneNumber();
        this.status = user.getStatus().name();
        this.dateOfBirth = user.getDateOfBirth();
        this.fullName = user.getFullName();
        this.gender = user.getGender();
        this.citizenIdentity = user.getCitizenIdentity();
    }

}
