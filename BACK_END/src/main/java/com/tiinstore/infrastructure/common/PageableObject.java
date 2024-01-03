package com.tiinstore.infrastructure.common;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PageableObject<T> {

    private List<T> data;
    private long totalPages;
    private long totalElements;
    private int currentPage;
    public PageableObject(Page<T> page) {
        this.data = page.getContent();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.currentPage = page.getNumber();
    }
}
