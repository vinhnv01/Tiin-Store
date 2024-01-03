package com.tiinstore.controller.admin;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.category.FinterCategoryRequest;
import com.tiinstore.dto.request.category.UpdateCategoryRequest;
import com.tiinstore.dto.request.sole.FinterSoleRequest;
import com.tiinstore.dto.request.sole.UpdateSoleRequest;
import com.tiinstore.service.CategoryService;
import com.tiinstore.service.SoleService;
import com.tiinstore.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/sole")
@CrossOrigin("*")
public class SoleRestController {

    @Autowired
    private SoleService soleService;

    @GetMapping()
    public ResponseObject view(FinterSoleRequest request) {
        return new ResponseObject(soleService.findAll(request));
    }

    @PostMapping()
    public ResponseObject add(@RequestBody BaseRequest request) {
        return new ResponseObject(soleService.add(request));
    }

    @PutMapping()
    public ResponseObject update(@RequestBody UpdateSoleRequest request) {
        return new ResponseObject(soleService.update(request));
    }

}
