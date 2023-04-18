package com.CargoFeeSimulator.API.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class JsonParser {
    private ArrayList<Path> paths;

}

