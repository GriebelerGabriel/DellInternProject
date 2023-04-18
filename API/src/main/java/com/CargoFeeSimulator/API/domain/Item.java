package com.CargoFeeSimulator.API.domain;

import lombok.*;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item{

    private String itemName;
    private Double weight;
    private Integer quantity;

}
