package com.CargoFeeSimulator.API.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Path {

    private String destinyCity;
    private ArrayList<Item> itemsQuantitiesWeightsList;
    private String originCity;

}
