package com.blockhomes.tradings.entity.common;

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
@Table(name = "image")
public class Image extends BaseEntity {

    @Id
    @Column(name = "image_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageNo;

    @NotNull
    @Column(name = "image_url", nullable = false)
    private Integer imageUrl;

}