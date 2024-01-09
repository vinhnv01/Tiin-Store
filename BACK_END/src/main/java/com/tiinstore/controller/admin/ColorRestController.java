package com.tiinstore.controller.admin;

import com.tiinstore.dto.request.color.ColorRequest;
import com.tiinstore.service.ColorService;
import com.tiinstore.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/color")
@CrossOrigin("*")
public class ColorRestController {

    @Autowired
    private ColorService colorService;

    @GetMapping()
    public ResponseObject view() {
        return new ResponseObject(colorService.findAll());
    }

    @PostMapping()
    public ResponseObject add(@RequestBody ColorRequest request) {
        return new ResponseObject(colorService.add(request));
    }


}
