package com.tiinstore.service;

import com.tiinstore.dto.request.user.EmployeeRequest;
import com.tiinstore.dto.response.EmployeeResponse;
import com.tiinstore.dto.response.impldto.EmployeeResponseImplDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EmployeeService {

    List<EmployeeResponse> getAll();

    EmployeeResponseImplDTO add (EmployeeRequest request , MultipartFile file);
    EmployeeResponseImplDTO update (EmployeeRequest request , MultipartFile file);

    EmployeeResponse getOneById (String id);
}
