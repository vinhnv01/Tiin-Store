package com.tiinstore.dto.request.user;

import com.tiinstore.infrastructure.constant.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BaseUser {

    private String fullName;

    private String code;

    private Long dateOfBirth;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private String citizenIdentity;

    private Status status;

    private int provinceId;

    private String province;

    private int toDistrictId;

    private String district;

    private String wardId;

    private String ward;

    private String line;

}
