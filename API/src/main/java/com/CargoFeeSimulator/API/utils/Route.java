package com.CargoFeeSimulator.API.utils;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Route {

    private String origin;
    private String destiny;
    private double totalAmount;

}
