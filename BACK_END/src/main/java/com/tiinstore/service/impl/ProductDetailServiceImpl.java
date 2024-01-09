package com.tiinstore.service.impl;

import com.tiinstore.dto.request.productdetail.ListImageProductDetailByColor;
import com.tiinstore.dto.request.productdetail.ProductDetailRequestByQuantityAndPrice;
import com.tiinstore.dto.request.productdetail.ProductDetailRequet;
import com.tiinstore.dto.response.ProductDetatilResponse;
import com.tiinstore.dto.response.impldto.ProductDetailResponseDTO;
import com.tiinstore.entity.Brand;
import com.tiinstore.entity.Category;
import com.tiinstore.entity.Image;
import com.tiinstore.entity.Material;
import com.tiinstore.entity.Product;
import com.tiinstore.entity.ProductDetail;
import com.tiinstore.entity.Sole;
import com.tiinstore.infrastructure.cloudinary.CloudinaryResult;
import com.tiinstore.infrastructure.cloudinary.QRCodeAndCloudinary;
import com.tiinstore.infrastructure.cloudinary.UploadImageToCloudinary;
import com.tiinstore.infrastructure.constant.GenderProductDetail;
import com.tiinstore.infrastructure.constant.Status;
import com.tiinstore.repository.BrandReposiory;
import com.tiinstore.repository.CategoryReposiory;
import com.tiinstore.repository.ColorReposiory;
import com.tiinstore.repository.ImageRepostory;
import com.tiinstore.repository.MaterialReposiory;
import com.tiinstore.repository.ProductDetailRepostory;
import com.tiinstore.repository.ProductReposiory;
import com.tiinstore.repository.SizeReposiory;
import com.tiinstore.repository.SoleReposiory;
import com.tiinstore.service.ProductDetailService;
import com.tiinstore.util.RandomNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailRepostory productDetailRepostory;

    @Autowired
    private ProductReposiory productReposiory;

    @Autowired
    private SoleReposiory soleReposiory;

    @Autowired
    private BrandReposiory brandReposiory;

    @Autowired
    private MaterialReposiory materialReposiory;

    @Autowired
    private CategoryReposiory categoryReposiory;

    @Autowired
    private ColorReposiory colorReposiory;

    @Autowired
    private SizeReposiory sizeReposiory;

    @Autowired
    private QRCodeAndCloudinary qrCodeAndCloudinary;

    @Autowired
    private ImageRepostory imageRepostory;

    @Autowired
    private UploadImageToCloudinary imageToCloudinary;

    @Override
    public List<ProductDetatilResponse> findAllProductDetail() {
        return productDetailRepostory.findAllProductDetail();
    }

    @Override
    @Transactional
    @Async
    public List<ProductDetailResponseDTO> add(ProductDetailRequet productDetailRequet,
                                              List<ProductDetailRequestByQuantityAndPrice> requestByQuantityAndPrices,
                                              List<ListImageProductDetailByColor> listImageProductDetailByColors) throws ExecutionException, InterruptedException {

        Sole sole = soleReposiory.findById(productDetailRequet.getIdSole()).get();
        Product product = createProductIfNotExist(productDetailRequet.getNameProduct());
        Brand brand = brandReposiory.findById(productDetailRequet.getIdBrand()).get();
        Category category = categoryReposiory.findById(productDetailRequet.getIdCategory()).get();
        Material material = materialReposiory.findById(productDetailRequet.getIdMaterial()).get();
        List<CompletableFuture<ProductDetail>> listDetailFutures = requestByQuantityAndPrices.stream().map(data ->
                CompletableFuture.supplyAsync(() -> {
                    ProductDetail productDetail = new ProductDetail();
                    productDetail.setProduct(product);
                    productDetail.setBrand(brand);
                    productDetail.setCategory(category);
                    productDetail.setMaterial(material);
                    productDetail.setSole(sole);
                    productDetail.setColor(colorReposiory.findByName(data.getColor()));
                    productDetail.setSize(sizeReposiory.findByName(data.getSize()));
                    productDetail.setQuantity(data.getQuantity());
                    productDetail.setPrice(data.getPrice());
                    productDetail.setDescription(productDetailRequet.getNoteProduct());
                    productDetail.setStatus(Status.DANG_SU_DUNG);
                    productDetail.setMaQR(qrCodeAndCloudinary.generateAndUploadQRCode(data.getBarcode()));
                    productDetail.setGender(getGenderProductDetail(productDetailRequet.getGender()));
                    return productDetail;
                })).collect(Collectors.toList());

        List<ProductDetail> productDetails = listDetailFutures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
        productDetailRepostory.saveAll(productDetails);

        CompletableFuture<List<CloudinaryResult>> uploadFuture = imageToCloudinary.uploadImagesAsync(listImageProductDetailByColors);
        List<CloudinaryResult> listUrl = uploadFuture.get();
        List<String> existingColors = listUrl.stream()
                .map(CloudinaryResult::getColor)
                .collect(Collectors.toList());
        List<Image> images = listUrl.parallelStream().filter(result -> existingColors.contains(result.getColor()))
                .flatMap(result -> {
                    List<ProductDetail> matchingDetails = productDetails.stream()
                            .filter(detail -> detail.getColor().getName().equals(result.getColor()))
                            .collect(Collectors.toList());

                    return matchingDetails.stream().map(matchingDetail -> {
                        Image image = new Image();
                        image.setName(result.getUrl());
                        image.setProductDetail(matchingDetail);
                        image.setStatus(true);
                        return image;
                    });
                }).collect(Collectors.toList());

        imageRepostory.saveAll(images);

        List<ProductDetailResponseDTO> detailDTOS = new ArrayList<>();
        productDetails.stream().forEach(a -> detailDTOS.add(new ProductDetailResponseDTO(a)));
        return detailDTOS;
    }

    private GenderProductDetail getGenderProductDetail(String gender) {
        switch (gender) {
            case "NAM":
                return GenderProductDetail.NAM;
            case "NU":
                return GenderProductDetail.NU;
            default:
                return GenderProductDetail.NAM_VA_NU;
        }
    }

    private Product createProductIfNotExist(String nameProduct) {
        Product product = productReposiory.findByName(nameProduct);
        if (product == null) {
            product = new Product();
            product.setCode(new RandomNumberGenerator().randomToString("SP", 2000000000));
            product.setName(nameProduct);
            product.setStatus(Status.DANG_SU_DUNG);
            productReposiory.save(product);
        }
        return product;
    }
}
