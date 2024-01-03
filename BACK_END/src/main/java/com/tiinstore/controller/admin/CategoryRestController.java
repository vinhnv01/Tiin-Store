package com.tiinstore.controller.admin;

import com.tiinstore.dto.request.base.BaseRequest;
import com.tiinstore.dto.request.category.FinterCategoryRequest;
import com.tiinstore.dto.request.category.UpdateCategoryRequest;
import com.tiinstore.service.CategoryService;
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
@RequestMapping("/api/admin/category")
@CrossOrigin("*")
public class CategoryRestController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping()
    public ResponseObject view (FinterCategoryRequest request){
        return new ResponseObject(categoryService.findAll(request));
    }

    @PostMapping()
    public ResponseObject add (@RequestBody BaseRequest request){
        return new ResponseObject(categoryService.add(request));
    }

    @PutMapping()
    public ResponseObject update (@RequestBody UpdateCategoryRequest request){
        return new ResponseObject(categoryService.update(request));
    }

}
