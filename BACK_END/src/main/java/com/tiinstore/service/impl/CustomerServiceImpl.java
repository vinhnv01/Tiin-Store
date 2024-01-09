package com.tiinstore.service.impl;

import com.tiinstore.dto.request.user.CustomerRequest;
import com.tiinstore.dto.request.user.EmployeeRequest;
import com.tiinstore.dto.request.user.FinterUserRequest;
import com.tiinstore.dto.response.CustomerRespone;
import com.tiinstore.dto.response.EmployeeResponse;
import com.tiinstore.dto.response.impldto.CustomerResponseImplDTO;
import com.tiinstore.dto.response.impldto.EmployeeResponseImplDTO;
import com.tiinstore.entity.Address;
import com.tiinstore.entity.User;
import com.tiinstore.infrastructure.cloudinary.UploadImageToCloudinary;
import com.tiinstore.infrastructure.constant.Roles;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.infrastructure.email.EmailServiceImpl;
import com.tiinstore.infrastructure.exception.rest.RestApiException;
import com.tiinstore.repository.AddressRepository;
import com.tiinstore.repository.UserRepository;
import com.tiinstore.service.CustomerService;
import com.tiinstore.service.EmployeeService;
import com.tiinstore.util.RandomNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UploadImageToCloudinary uploadImageToCloudinary;

    @Autowired
    private EmailServiceImpl emailService;

    @Override
    public List<CustomerRespone> getAll(FinterUserRequest rep) {
        return userRepository.getAllCustomer(rep);
    }

    @Override
    public CustomerResponseImplDTO add(CustomerRequest request, MultipartFile file) {

        // todo: upload img
        String url = uploadImageToCloudinary.uploadImage(file);
        String password = new RandomNumberGenerator().randomPassword();
        emailService.sendEmailPasword(request.getEmail(), "Mật khẩu của bạn là ", password);

        // todo: add user
        User add = new User();
        add.setFullName(request.getFullName());
        add.setCode(new RandomNumberGenerator().randomToString("KH",99999999));
        add.setEmail(request.getEmail());
        add.setGender(request.getGender());
        add.setRole(Roles.ROLE_USER);
        add.setPoints(0);
        add.setCitizenIdentity(request.getCitizenIdentity());
        add.setStatus(Status.DANG_SU_DUNG);
        add.setDateOfBirth(request.getDateOfBirth());
        add.setAvata(url);
        add.setPassword(password);
        add.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(add);

        // todo : add address
        Address address = new Address();
        address.setDistrict(request.getDistrict());
        address.setLine(request.getLine());
        address.setWard(request.getWard());
        address.setUser(add);
        address.setProvinceId(request.getProvinceId());
        address.setProvince(request.getProvince());
        address.setWardCode(request.getWardId());
        address.setToDistrictId(request.getToDistrictId());
        address.setFullName(request.getFullName());
        address.setPhoneNumber(request.getPhoneNumber());
        address.setStatus(Status.DANG_SU_DUNG);
        addressRepository.save(address);

        return new CustomerResponseImplDTO(add, address);
    }

    @Override
    @Async
    @Transactional
    public CustomerResponseImplDTO update(CustomerRequest request, MultipartFile file) {

        Optional<User> optional = userRepository.findById(request.getIdUser());
        if (!optional.isPresent()) {
            throw new RestApiException("Người dùng không tồn tại.");
        }

        // todo: add user
        User update = optional.get();
        update.setFullName(request.getFullName());
        update.setEmail(request.getEmail());
        update.setGender(request.getGender());
        update.setPoints(0);
        update.setCitizenIdentity(request.getCitizenIdentity());
        update.setStatus(Status.DANG_SU_DUNG);
        update.setDateOfBirth(request.getDateOfBirth());
        update.setAvata(file == null ? optional.get().getAvata() : uploadImageToCloudinary.uploadImage(file));
        update.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(update);

        // todo : add address
        Address address = addressRepository.findByUserAndStatus(update.getId());
        address.setDistrict(request.getDistrict());
        address.setLine(request.getLine());
        address.setWard(request.getWard());
        address.setUser(update);
        address.setProvinceId(request.getProvinceId());
        address.setProvince(request.getProvince());
        address.setWardCode(request.getWardId());
        address.setToDistrictId(request.getToDistrictId());
        address.setFullName(request.getFullName());
        address.setPhoneNumber(request.getPhoneNumber());
        address.setStatus(Status.DANG_SU_DUNG);
        addressRepository.save(address);

        return new CustomerResponseImplDTO(update, address);
    }

    @Override
    public CustomerRespone getOneById(String id) {
        CustomerRespone optional = userRepository.findByIdCustomer(id);
        if (optional == null) {
            throw new RestApiException("Người dùng không tồn tại.");
        }
        return optional;
    }

    @Override
    public CustomerResponseImplDTO updateStatus(String id , String status) {
        Optional<User> optional = userRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException("Người dùng không tồn tại.");
        }
        optional.get().setStatus(Status.DANG_SU_DUNG.name().equals(status) ? Status.DANG_SU_DUNG : Status.KHONG_SU_DUNG);
        userRepository.save(optional.get());
        return new CustomerResponseImplDTO(optional.get());
    }
}
