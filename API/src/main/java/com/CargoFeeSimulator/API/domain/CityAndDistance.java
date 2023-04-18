package com.CargoFeeSimulator.API.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CityAndDistance {

    private String name;
    private Integer distance;

}