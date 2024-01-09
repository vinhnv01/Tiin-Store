package com.tiinstore.infrastructure.cloudinary;

import com.cloudinary.Cloudinary;
import com.tiinstore.dto.request.productdetail.ListImageProductDetailByColor;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UploadImageToCloudinary {

    private final Cloudinary cloudinary;

    @Async
    public CompletableFuture<List<CloudinaryResult>> uploadImagesAsync(List<ListImageProductDetailByColor> fileDTOs)  {
        List<CompletableFuture<CloudinaryResult>> futures = fileDTOs.stream()
                .map(fileDTO -> CompletableFuture.supplyAsync(() -> {
                    try {
                        String publicId = UUID.randomUUID().toString();
                        Map<String, String> imageUploadData = new HashMap<>();
                        imageUploadData.put("public_id", publicId);

                        Map<String, Object> result = cloudinary.uploader().upload(fileDTO.getFile().getBytes(), imageUploadData);
                        String url = extractUrlFromResult(result);
                        String color = fileDTO.getColor();

                        return new CloudinaryResult(url, color);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }))
                .collect(Collectors.toList());

        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(v -> futures.stream()
                        .map(CompletableFuture::join)
                        .collect(Collectors.toList()))
                .toCompletableFuture();
    }
    private String extractUrlFromResult(Map<String, Object> result) {
        return (String) result.get("url");
    }


    public String uploadImage(MultipartFile file) {
        try {
            Map<String, Object> uploadResult = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
            return (String) uploadResult.get("url");
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed", e);
        }
    }


}
