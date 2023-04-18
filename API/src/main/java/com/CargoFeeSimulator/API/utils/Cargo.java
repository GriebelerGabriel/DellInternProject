package com.CargoFeeSimulator.API.utils;

import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@Builder
public class Cargo {

    private float totalAmount;                                      // custo total

    private ArrayList<Route> totalByRoutes;                         // custo por trecho  ?????????

    private float averageAmountByKm;                                // custo médio por km

    private ArrayList<Product> averageCostByProducts;               // Custo total por modalidades

    private int totalTrucks;                                        // número de veiculos deslocados

    private int totalItems;                                         // numero total de itens deslocados



}
