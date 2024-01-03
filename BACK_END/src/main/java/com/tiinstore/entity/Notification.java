package com.tiinstore.entity;

import com.tiinstore.entity.base.PrimaryEntity;
import com.tiinstore.infrastructure.constant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Nguyễn Vinh
 */
@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "notification")
@AllArgsConstructor
@NoArgsConstructor
public class Notification extends PrimaryEntity {

    @Column(name = "notify_content")
    private String notifyContent;

    private String url;

    private String receiver;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private User account;

    @OneToOne
    @JoinColumn(name = "id_bill", referencedColumnName = "id")
    private Bill bill;
}
