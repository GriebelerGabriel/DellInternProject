package com.CargoFeeSimulator.API.utils;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    private String itemName;
    private Float averageValueByProduct;

}
