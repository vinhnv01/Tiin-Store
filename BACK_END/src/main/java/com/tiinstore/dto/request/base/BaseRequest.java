package com.tiinstore.dto.request.base;

import com.tiinstore.infrastructure.constant.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BaseRequest {

    private String name;

    private Status status;
}
