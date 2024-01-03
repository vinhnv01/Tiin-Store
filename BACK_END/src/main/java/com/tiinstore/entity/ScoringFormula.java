package com.tiinstore.entity;

import com.tiinstore.entity.base.PrimaryEntity;
import com.tiinstore.infrastructure.constant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "scoring_formula")
@AllArgsConstructor
@NoArgsConstructor
public class ScoringFormula extends PrimaryEntity {

    @Column(name = "exchange_rate_poin")
    private BigDecimal exchangeRatePoin;

    @Column(name = "exchange_rate_money")
    private BigDecimal exchangeRateMoney;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Transient
    public int ConvertMoneyToPoints(BigDecimal totalMoney){
        return totalMoney.divide(exchangeRatePoin, 0, BigDecimal.ROUND_DOWN).intValue();
    }
    @Transient
    public BigDecimal  ConvertPoinToMoney(int poin){
        return BigDecimal.valueOf(poin).multiply(exchangeRateMoney);
    }
}
