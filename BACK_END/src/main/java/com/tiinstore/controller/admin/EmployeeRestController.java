package com.tiinstore.controller.admin;

import com.google.gson.Gson;
import com.tiinstore.dto.request.user.EmployeeRequest;
import com.tiinstore.service.EmployeeService;
import com.tiinstore.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/employee")
@CrossOrigin("*")
public class EmployeeRestController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping()
    public ResponseObject view() {
        return new ResponseObject(employeeService.getAll());
    }

    @PostMapping()
    public ResponseObject add(@RequestParam("request") String request,
                              @RequestParam(value = "file") MultipartFile file) {
        Gson gson = new Gson();
        EmployeeRequest employeeRequest = gson.fromJson(request, EmployeeRequest.class);
        return new ResponseObject(employeeService.add(employeeRequest, file));
    }

    @PutMapping()
    public ResponseObject update(@RequestParam("request") String request,
                                 @RequestParam(value = "file", required = false) MultipartFile file) {
        Gson gson = new Gson();
        EmployeeRequest employeeRequest = gson.fromJson(request, EmployeeRequest.class);
        return new ResponseObject(employeeService.update(employeeRequest, file));
    }

    @GetMapping("/{id}")
    public ResponseObject getOneById(@PathVariable("id") String id) {
        return new ResponseObject(employeeService.getOneById(id));
    }

    @PostMapping("/update")
    public ResponseObject updateStatus(@RequestParam("id") String id,
                                       @RequestParam("status") String status) {
        Gson gson = new Gson();
        String idUser = gson.fromJson(id, String.class);
        String statusGson = gson.fromJson(status, String.class);
        return new ResponseObject(employeeService.updateStatus(idUser,statusGson));
    }
}
