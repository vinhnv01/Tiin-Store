package com.tiinstore.controller.admin;

import com.tiinstore.dto.request.size.SizeRequest;
import com.tiinstore.service.SizeService;
import com.tiinstore.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/size")
@CrossOrigin("*")
public class SizeRestController {

    @Autowired
    private SizeService sizeService;

    @GetMapping()
    public ResponseObject view() {
        return new ResponseObject(sizeService.findAll());
    }

    @PostMapping()
    public ResponseObject add(@RequestBody SizeRequest request) {
        return new ResponseObject(sizeService.add(request));
    }

}
