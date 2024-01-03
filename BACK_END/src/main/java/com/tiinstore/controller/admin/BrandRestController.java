package com.tiinstore.controller.admin;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.brand.FinterBrandRequest;
import com.tiinstore.dto.request.brand.UpdateBrandRequest;
import com.tiinstore.service.BrandService;
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
@RequestMapping("/api/admin/brand")
@CrossOrigin("*")
public class BrandRestController {

    @Autowired
    private BrandService brandService;

    @GetMapping()
    public ResponseObject view(FinterBrandRequest request) {
        return new ResponseObject(brandService.findAll(request));
    }

    @PostMapping()
    public ResponseObject add(@RequestBody BaseRequest request) {
        return new ResponseObject(brandService.add(request));
    }

    @PutMapping()
    public ResponseObject update(@RequestBody UpdateBrandRequest request) {
        return new ResponseObject(brandService.update(request));
    }

}
