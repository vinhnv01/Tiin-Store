package com.tiinstore.dto.request.category;

import com.tiinstore.infrastructure.constant.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequest {

    private String name;

    private Status status;
}
