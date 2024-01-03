package com.tiinstore.entity;

import com.tiinstore.entity.base.PrimaryEntity;
import com.tiinstore.infrastructure.constant.StatusBill;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "product_detail_give_back")
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailGiveBack extends PrimaryEntity {

    @Column(name = "id_product_detail")
    private String idProductDetail;

    @Column(name = "quantity")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private StatusBill statusBill;
}
