package com.CargoFeeSimulator.API.domain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OriginCity {

    private String name;
    private List<CityAndDistance> destinyAndDistance;

}
