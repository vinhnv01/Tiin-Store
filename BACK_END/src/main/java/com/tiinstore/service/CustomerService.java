package com.tiinstore.service;

import com.tiinstore.dto.request.user.CustomerRequest;
import com.tiinstore.dto.request.user.EmployeeRequest;
import com.tiinstore.dto.request.user.FinterUserRequest;
import com.tiinstore.dto.response.CustomerRespone;
import com.tiinstore.dto.response.EmployeeResponse;
import com.tiinstore.dto.response.impldto.CustomerResponseImplDTO;
import com.tiinstore.dto.response.impldto.EmployeeResponseImplDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CustomerService {

    List<CustomerRespone> getAll(FinterUserRequest rep);

    CustomerResponseImplDTO add(CustomerRequest request, MultipartFile file);

    CustomerResponseImplDTO update(CustomerRequest request, MultipartFile file);

    CustomerRespone getOneById(String id);

    CustomerResponseImplDTO updateStatus(String id, String status);

}
