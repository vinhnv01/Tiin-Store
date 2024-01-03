package com.tiinstore.controller.admin;

import com.tiinstore.dto.request.category.CategoryRequest;
import com.tiinstore.service.CategoryService;
import com.tiinstore.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/category")
@CrossOrigin("*")
public class CategoryRestController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping()
    public ResponseObject view (){
        return new ResponseObject(categoryService.findAll());
    }

    @PostMapping()
    public ResponseObject add (@RequestBody CategoryRequest request){
        return new ResponseObject(categoryService.add(request));
    }

}
