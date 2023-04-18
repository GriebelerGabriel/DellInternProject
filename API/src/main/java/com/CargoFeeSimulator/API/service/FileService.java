package com.CargoFeeSimulator.API.service;

import com.CargoFeeSimulator.API.domain.CityAndDistance;
import com.CargoFeeSimulator.API.domain.OriginCity;
import com.CargoFeeSimulator.API.domain.Path;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

@Getter
@Service
public class FileService { // Class to read and separate file in variables
    private final ArrayList<OriginCity> listOriginCities;

    private ArrayList<String> cities;

    public FileService(ArrayList<OriginCity> city) {
        this.listOriginCities = getAllCsvValues();
    }


    public ArrayList getAllCsvValues(){
        ArrayList<OriginCity> values = new ArrayList<>();
        String[] citiesSplitted;
        String[] distancesSplitted;

        try {
            File fileCSV = new File("src/main/java/com/CargoFeeSimulator/API/utils/DNIT-Distancias.csv");
            Scanner reader = new Scanner(fileCSV);              // Create the reader and put the axis on the first byte of the file

            String data = reader.nextLine().strip();            // Read the first line (Names)
            citiesSplitted = data.split(";");                     // Create a list with each city, splitted by ;

            for(int originCityIterator=0; citiesSplitted.length > originCityIterator; originCityIterator++){      // iterates by origin city
                ArrayList<CityAndDistance> cityAndDistancesTuple = new ArrayList<>();

                String distancesData = reader.nextLine().strip();            // Read new line from distances based on origin city
                distancesSplitted = distancesData.split(";");                   // Create a list with each city, splitted by ;

                for (int numberOfDistances = 0; citiesSplitted.length > numberOfDistances; numberOfDistances++) {   // iterates by distances
                    cityAndDistancesTuple.add( new CityAndDistance(
                            citiesSplitted[numberOfDistances], Integer.parseInt(distancesSplitted[numberOfDistances]
                    )));
                }
                values.add(new OriginCity(citiesSplitted[originCityIterator], cityAndDistancesTuple));
            }
            reader.close();

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        return values;
    }

}
