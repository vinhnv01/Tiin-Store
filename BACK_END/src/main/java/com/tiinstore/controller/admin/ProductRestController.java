package com.tiinstore.controller.admin;

import com.tiinstore.dto.request.product.FinterProductRequest;
import com.tiinstore.dto.request.product.ProdcutRequest;
import com.tiinstore.service.ProductService;
import com.tiinstore.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/product")
@CrossOrigin("*")
public class ProductRestController {

    @Autowired
    private ProductService productService;

    @GetMapping()
    public ResponseObject view(FinterProductRequest request) {
        return new ResponseObject(productService.findAll(request));
    }

    @GetMapping("/get-all")
    public ResponseObject viewAll(FinterProductRequest request ) {
        return new ResponseObject(productService.getAll(request));
    }

    @PostMapping()
    public ResponseObject add(@RequestBody ProdcutRequest request) {
        return new ResponseObject(productService.add(request));
    }


}
