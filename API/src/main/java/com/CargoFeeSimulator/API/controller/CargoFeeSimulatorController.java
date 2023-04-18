package com.CargoFeeSimulator.API.controller;


import com.CargoFeeSimulator.API.domain.JsonParser;
import com.CargoFeeSimulator.API.domain.OriginCity;

import com.CargoFeeSimulator.API.service.CargoFeeSilmulatorService;
import com.CargoFeeSimulator.API.utils.Cargo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/CargoFeeSimulator")
public class CargoFeeSimulatorController {

    @Autowired
    private CargoFeeSilmulatorService cargoFeeSimulatorService;

    @GetMapping("/Cities")
    public ArrayList getAllOriginCities(){
        return cargoFeeSimulatorService.getAllCities();
    }

    @GetMapping("/{originCity}")
    public List<OriginCity> getTupleByOrigin(@PathVariable String originCity){
       return cargoFeeSimulatorService.getDestinyAndDistanceByOrigin(originCity);
    }

    @GetMapping("/{originCity}/{modality}/{destinyCity}")
    public String getDistanceBetweenTwoCities(@PathVariable String originCity, @PathVariable String modality, @PathVariable String destinyCity){
        return cargoFeeSimulatorService.getDistanceBetweenTwoCities(originCity, modality, destinyCity);
    }

    @PostMapping("/NewTransport")
    public String getTransportValue(@RequestBody JsonParser fullTripListObject){
        return cargoFeeSimulatorService.getTransportValue(fullTripListObject);
    }

    @GetMapping("/Statistics")
    public ArrayList<Cargo> getStatisticData(){
        return cargoFeeSimulatorService.getStatisticData();
    }

}
