package com.tiinstore.controller.admin;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.material.FinterMaterialRequest;
import com.tiinstore.dto.request.material.UpdateMaterialRequest;
import com.tiinstore.service.MaterialService;
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
@RequestMapping("/api/admin/material")
@CrossOrigin("*")
public class MaterialRestController {

    @Autowired
    private MaterialService materialService;

    @GetMapping()
    public ResponseObject view(FinterMaterialRequest request) {
        return new ResponseObject(materialService.findAll(request));
    }

    @PostMapping()
    public ResponseObject add(@RequestBody BaseRequest request) {
        return new ResponseObject(materialService.add(request));
    }

    @PutMapping()
    public ResponseObject update(@RequestBody UpdateMaterialRequest request) {
        return new ResponseObject(materialService.update(request));
    }

}
