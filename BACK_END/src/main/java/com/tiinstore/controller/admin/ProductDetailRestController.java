package com.tiinstore.controller.admin;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tiinstore.dto.request.productdetail.ListImageProductDetailByColor;
import com.tiinstore.dto.request.productdetail.ProductDetailRequestByQuantityAndPrice;
import com.tiinstore.dto.request.productdetail.ProductDetailRequet;
import com.tiinstore.service.ProductDetailService;
import com.tiinstore.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/admin/product-detail")
@CrossOrigin("*")
public class ProductDetailRestController {

    @Autowired
    private ProductDetailService productDetailService;

    @GetMapping()
    public ResponseObject view() {
        return new ResponseObject(productDetailService.findAllProductDetail());
    }

    @PostMapping()
    public ResponseObject add(@RequestParam("productDetail") String productDetail,
                              @RequestParam Map<String, MultipartFile> fileMap,
                              @RequestParam("listDataProductDetail") String listDataProduct) throws ExecutionException, InterruptedException {
        Gson gson = new Gson();
        ProductDetailRequet productDetailRequet = gson.fromJson(productDetail, ProductDetailRequet.class);
        JsonArray jsonData = JsonParser.parseString(listDataProduct).getAsJsonArray();
        List<ProductDetailRequestByQuantityAndPrice> detailRequestByQuantityAndPrices = new ArrayList<>();
        for (JsonElement data : jsonData) {
            ProductDetailRequestByQuantityAndPrice detail = gson.fromJson(data, ProductDetailRequestByQuantityAndPrice.class);
            detailRequestByQuantityAndPrices.add(detail);
        }

        List<ListImageProductDetailByColor> listImageProductDetailByColors = new ArrayList<>();
        for (String color : fileMap.keySet()) {
            ListImageProductDetailByColor dto = new ListImageProductDetailByColor();
            MultipartFile file = fileMap.get(color);
            dto.setColor(color.substring(0, color.indexOf('-')));
            dto.setFile(file);
            listImageProductDetailByColors.add(dto);
        }
        return new ResponseObject(productDetailService.add(productDetailRequet,
                detailRequestByQuantityAndPrices, listImageProductDetailByColors));
    }


}
