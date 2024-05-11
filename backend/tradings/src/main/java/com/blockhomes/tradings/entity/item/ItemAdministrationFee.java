package com.blockhomes.tradings.entity.item;

import com.blockhomes.tradings.entity.common.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "item_administration_fee")
public class ItemAdministrationFee extends BaseEntity {

    @Id
    @Column(name = "item_administration_fee_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemAdministrationFeeNo;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "item_no", nullable = false)
    private Item item;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "administration_fee_no", nullable = false)
    private AdministrationFee administrationFee;

}