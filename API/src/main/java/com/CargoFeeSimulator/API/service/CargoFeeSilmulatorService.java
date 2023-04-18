package com.CargoFeeSimulator.API.service;

import com.CargoFeeSimulator.API.domain.*;
import com.CargoFeeSimulator.API.utils.Cargo;
import com.CargoFeeSimulator.API.utils.Modality;
import com.CargoFeeSimulator.API.utils.Product;
import com.CargoFeeSimulator.API.utils.Route;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Getter
public class CargoFeeSilmulatorService {

    @Autowired
    private FileService fileService;

    private ArrayList<Cargo> cargos = new ArrayList();

    public ArrayList<String> getAllCities(){
        ArrayList<OriginCity> fileObject =  fileService.getListOriginCities();
        ArrayList<String> cities = new ArrayList<>();
        fileObject.forEach(
                originCity -> {
                    cities.add(originCity.getName());
                });
        return cities;
    }

    public List<OriginCity> getDestinyAndDistanceByOrigin(String originCityName){
        ArrayList<OriginCity> fileObject =  fileService.getListOriginCities();              // Get the entire CSV
        return fileObject.stream().filter(originCity -> (Objects.equals(originCity.getName(), originCityName))).collect(Collectors.toList());  // get distances and destinies from origin city
    }

    public String getDistanceBetweenTwoCities(String originCityName, String modality, String destinyCityName) throws ResponseStatusException {
        ArrayList<OriginCity> fileObject = fileService.getListOriginCities();

        Optional<OriginCity> originCitySelected = fileObject.stream().filter(originCity ->
                (Objects.equals(originCity.getName(), originCityName))).findFirst();

        if (originCitySelected.isEmpty()) {
            return  "Não existe a cidade de origem selecionada!";

        } else {
            Optional<CityAndDistance> destinyAndDistanceSelected = originCitySelected.get().getDestinyAndDistance().stream().filter(cityAndDistance ->
                    (Objects.equals(cityAndDistance.getName(), destinyCityName))).findFirst();

            if (destinyAndDistanceSelected.isEmpty()) {
                return "Não existe a cidade de destino selecionada!";

            } else {
                if (modality.equals("Caminhão de pequeno porte")) {
                    return "O valor entre " + originCityName + " e " + destinyCityName +
                            " utilizando um Caminhão de pequeno porte é de: R$" + (destinyAndDistanceSelected.get().getDistance() * 4.87);
                }
                if (modality.equals("Caminhão de médio porte")) {
                    return "O valor entre " + originCityName + " e " + destinyCityName +
                            " utilizando um Caminhão de médio porte é de: R$" + (destinyAndDistanceSelected.get().getDistance() * 11.92);
                }
                if (modality.equals("Caminhão de grande porte")) {
                    return "O valor entre " + originCityName + " e " + destinyCityName +
                            " utilizando um Caminhão de grande porte é de: R$" + (destinyAndDistanceSelected.get().getDistance() * 27.44);
                }
            }
        }
        return "ERROR CONTACT SUPERIORS";
    }

    public Integer getDistanceBetweenTwoCitiesWithOutModality(String originCityName, String destinyCityName) throws ResponseStatusException {
        ArrayList<OriginCity> fileObject = fileService.getListOriginCities();
        Optional<OriginCity> originCitySelected = fileObject.stream().filter(originCity ->
                (Objects.equals(originCity.getName(), originCityName))).findFirst();

        Optional<CityAndDistance> destinyAndDistanceSelected = originCitySelected.get().getDestinyAndDistance().stream().filter(cityAndDistance ->
                (Objects.equals(cityAndDistance.getName(), destinyCityName))).findFirst();

        return destinyAndDistanceSelected.get().getDistance();
    }


    public String getTransportValue(JsonParser fullTripListObject) throws ResponseStatusException {

        ArrayList<Path> transportList = fullTripListObject.getPaths();      // uncap first object to get the attribute
        Path path = transportList.get(0);       // select the only item from main object

        ArrayList<Route> totalByRoutes = new ArrayList<>();
        List<String> totalItemsName = new ArrayList<>();

        ArrayList<Product> initialAverageCostByProducts = new ArrayList<>();
        ArrayList<Product> pitstopAverageCostByProducts = new ArrayList<>();
        ArrayList<Product> averageCostByProducts = new ArrayList<>();

        ArrayList<Modality> totalValueByModalities = new ArrayList<>();
        Modality smallTruck = new Modality();
        Modality averageTruck = new Modality();
        Modality bigTruck = new Modality();

        Route initialRoute = new Route();


        double initialTotalWeight = 0.0;
        int initialQuantityOfItems = 0;
        int numberSmallTrucks = 0, numberAverageTrucks = 0, numberBigTrucks = 0;



        for(var count = 0; path.getItemsQuantitiesWeightsList().size() > count; count++){
            initialTotalWeight += (path.getItemsQuantitiesWeightsList().get(count).getWeight()*path.getItemsQuantitiesWeightsList().get(count).getQuantity()); // Initial weight*quantity
            initialQuantityOfItems += path.getItemsQuantitiesWeightsList().get(count).getQuantity(); // add quantities to get sum of all items quantities
            totalItemsName.add(path.getItemsQuantitiesWeightsList().get(count).getItemName());
        }

        double totalItemsWeightAux = initialTotalWeight;

        while(totalItemsWeightAux > 0) {            // set all trucks necessaries
            if (totalItemsWeightAux >= 10000) {
                numberBigTrucks += 1;
                totalItemsWeightAux-=10000;
            } else if(totalItemsWeightAux >= 4000){
                numberAverageTrucks += 1;
                totalItemsWeightAux-=4000;
            } else if (totalItemsWeightAux >= 1000) {
                numberSmallTrucks += 1;
                totalItemsWeightAux-=1000;
            } else {
                numberSmallTrucks += 1;
                totalItemsWeightAux = 0;
            }
        }
        var distanceBetweenCities = getDistanceBetweenTwoCitiesWithOutModality(path.getOriginCity(), path.getDestinyCity()); // get distance
        double totalValue = (distanceBetweenCities)*((numberSmallTrucks*4.87)+(numberAverageTrucks*11.92)+(numberBigTrucks*27.44)); // TotalTripValue
        float totalValueToFloat = (float) Math.round((totalValue)* 100) / 100;
        float averageUnityCost = (float) Math.round((totalValue/initialQuantityOfItems)* 100) / 100;


        int totalItemsFromPitstop = 0;
        initialRoute.setOrigin(path.getOriginCity());
        initialRoute.setDestiny(path.getDestinyCity());
        initialRoute.setTotalAmount(totalValueToFloat);

        totalByRoutes.add(0, initialRoute);

        for(var count = 0; path.getItemsQuantitiesWeightsList().size() > count; count++){
            Product initialProducts = new Product();
            int itemQuantity = path.getItemsQuantitiesWeightsList().get(count).getQuantity();
            float itemWeight = (float) Math.round((path.getItemsQuantitiesWeightsList().get(count).getWeight())* 100) / 100;

            float itemQuantityAndWeight = itemQuantity*itemWeight;
            float averageItemCost = (float) Math.round(((totalValueToFloat*itemQuantityAndWeight)/initialTotalWeight)* 100) / 100;  // rule of three

            initialProducts.setItemName(path.getItemsQuantitiesWeightsList().get(count).getItemName());  // Set item name
            initialProducts.setAverageValueByProduct(averageItemCost);

            initialAverageCostByProducts.add(initialProducts);
        }


//        #######################################################################################################################



        if(transportList.size()>1) {

            // Params for pitstop

            Path pitstopPath = transportList.get(1);
            List<String> pitstopItemsNames = new ArrayList<>();
            Route pitstopRoute = new Route();

            int numberSmallTrucksForPitstop = 0, numberAverageTrucksForPitstop = 0, numberBigTrucksForPitstop = 0;
            double totalPitstopItemsWeight = 0.0;

            List<Item> afterPitstopItems = path.getItemsQuantitiesWeightsList().stream().map(item -> {
                ArrayList<Item> itemsQuantitiesWeightsList = pitstopPath.getItemsQuantitiesWeightsList();
                Item exItem = Item.builder().itemName(item.getItemName()).weight(item.getWeight()).quantity(item.getQuantity()).build();
                for (Item value : itemsQuantitiesWeightsList) {
                    if (item.getItemName().equals(value.getItemName())) {
                        exItem.setQuantity(item.getQuantity() - value.getQuantity());
                    }
                }
                return exItem;
            }).toList();

            for(Item value: afterPitstopItems){
                pitstopItemsNames.add(value.getItemName());
                totalPitstopItemsWeight += value.getWeight()*value.getQuantity();
                totalItemsFromPitstop += value.getQuantity();
            }

            double totalPitstopItemsWeightAux = totalPitstopItemsWeight;

            while(totalPitstopItemsWeightAux > 0) {
                if (totalPitstopItemsWeightAux >= 10000) {
                    numberBigTrucksForPitstop += 1;
                    totalPitstopItemsWeightAux-=10000;
                } else if(totalPitstopItemsWeightAux >= 4000){
                    numberAverageTrucksForPitstop += 1;
                    totalPitstopItemsWeightAux-=4000;
                } else if (totalPitstopItemsWeightAux >= 1000) {
                    numberSmallTrucksForPitstop += 1;
                    totalPitstopItemsWeightAux-=1000;
                } else {
                    numberSmallTrucksForPitstop += 1;
                    totalPitstopItemsWeightAux = 0;
                }
            }

            var distanceBetweenPitstopAndEnd = getDistanceBetweenTwoCitiesWithOutModality(pitstopPath.getOriginCity(), pitstopPath.getDestinyCity()); // get distance
            double trucksMultiplier = (numberSmallTrucksForPitstop * 4.87) + (numberAverageTrucksForPitstop * 11.92) + (numberBigTrucksForPitstop * 27.44);
            double pitstopToEndTotalValue = (distanceBetweenPitstopAndEnd)* trucksMultiplier; // TotalTripValue
            float pitstopToEndTotalValueToFloat = (float) Math.round((pitstopToEndTotalValue)* 100) / 100;
            float averageUnityCostPitstopToEndFloat = (float) Math.round((pitstopToEndTotalValue/totalItemsFromPitstop)* 100) / 100;

            pitstopRoute.setOrigin(pitstopPath.getOriginCity());
            pitstopRoute.setDestiny(pitstopPath.getDestinyCity());
            pitstopRoute.setTotalAmount(pitstopToEndTotalValueToFloat);

            totalByRoutes.add(1, pitstopRoute);

            for(var count = 0; afterPitstopItems.size() > count; count++){
                Product pitstopProducts = new Product();
                int itemQuantity = afterPitstopItems.get(count).getQuantity();
                float itemWeight = (float) Math.round((afterPitstopItems.get(count).getWeight())* 100) / 100;

                float itemQuantityAndWeight = itemQuantity*itemWeight;
                float averageItemCost = (float) Math.round(((totalValueToFloat*itemQuantityAndWeight)/totalPitstopItemsWeight)* 100) / 100;  // rule of three

                //  ^^^^ GET VALUES for pitstop ^^^^


                pitstopProducts.setItemName(path.getItemsQuantitiesWeightsList().get(count).getItemName());  // Set item name
                pitstopProducts.setAverageValueByProduct(averageItemCost);

                pitstopAverageCostByProducts.add(pitstopProducts);
            }

            for(int count=0; pitstopAverageCostByProducts.size()>count; count++){
                Product product = new Product();
                var initialItemAverageValue = initialAverageCostByProducts.get(count).getAverageValueByProduct();
                var pitstopItemAverageValue = pitstopAverageCostByProducts.get(count).getAverageValueByProduct();
                product.setAverageValueByProduct((initialItemAverageValue+pitstopItemAverageValue/2));
                product.setItemName(initialAverageCostByProducts.get(count).getItemName());
                averageCostByProducts.add(product);
            }

            // FIRST PRINT ORIGIN TO PITSTOP THEN PITSTOP TO END

            int totalTrucks = numberSmallTrucks + numberAverageTrucks + numberBigTrucks;
            int totalItems = initialQuantityOfItems + totalItemsFromPitstop;

            // ADD CARGO VARIABLES:
            float totalTripValue = (totalValueToFloat+pitstopToEndTotalValueToFloat);
            float averageAmountByKm = (pitstopToEndTotalValueToFloat/(distanceBetweenCities+distanceBetweenPitstopAndEnd));


            addCargo(totalTripValue, averageAmountByKm, totalByRoutes, averageCostByProducts, totalTrucks, totalItems);


            return (
                    "de "+path.getOriginCity()+" para "+path.getDestinyCity()+" , a distância a ser percorrida é de: "+distanceBetweenCities+" km," +
                    " para transporte dos produtos "+totalItemsName+" será necessário utilizar ["+numberSmallTrucks+"] caminhões de porte PEQUENO, [" +numberAverageTrucks+
                    "] de porte MÉDIO porte e ["+numberBigTrucks+"] de GRANDE porte, de forma a resultar no menor custo de transporte por km rodado. " +
                    " O valor total do transporte dos itens é R$ "+totalValueToFloat+", sendo R$ "+averageUnityCost+" o custo unitário médio. \n\n" +

                    "de "+pitstopPath.getOriginCity()+" para "+pitstopPath.getDestinyCity()+" , a distância a ser percorrida é de: "+distanceBetweenPitstopAndEnd+" km," +
                    " para transporte dos produtos "+pitstopItemsNames+" será necessário utilizar ["+numberSmallTrucksForPitstop+"] caminhões de porte PEQUENO, [" +numberAverageTrucksForPitstop+
                    "] de porte MÉDIO porte e ["+numberBigTrucksForPitstop+"] de GRANDE porte, de forma a resultar no menor custo de transporte por km rodado. " +
                    " O valor total do transporte dos itens é R$ "+pitstopToEndTotalValueToFloat+", sendo R$ "+averageUnityCostPitstopToEndFloat+" o custo unitário médio. "
            );

        }       // Returns for the origin to the end

        int totalTrucks = numberSmallTrucks + numberAverageTrucks + numberBigTrucks;
        int totalItems = initialQuantityOfItems + totalItemsFromPitstop;
        float averageAmountByKm = totalValueToFloat/distanceBetweenCities;

//        float totalValueToFloatAux = totalValueToFloat;
//
//        bigTruck.setModalityName("Caminhões grandes");
//        var bigValue = ((float) (totalValueToFloatAux/((numberBigTrucks * 27.44)*distanceBetweenCities)));
//        if(Float.isInfinite(bigValue)){
//            bigTruck.setValue((float) 0);
//            totalValueToFloatAux -= 0;
//        }else
//            bigTruck.setValue(bigValue*distanceBetweenCities);
//        totalValueByModalities.add(bigTruck);           // set to array
//
//
//        averageTruck.setModalityName("Caminhões médios");
//        var averageValue = ((float) (totalValueToFloatAux/((numberAverageTrucks * 11.92)*distanceBetweenCities)));
//        if(Float.isInfinite(averageValue)){
//            averageTruck.setValue((float) 0);
//            totalValueToFloatAux -= 0;
//        }else
//            averageTruck.setValue(averageValue);
//
//        totalValueByModalities.add(averageTruck);       // set to array
//
//
//
//        smallTruck.setModalityName("Caminhões pequenos");
//        var smallValue = ((float) (totalValueToFloatAux/((numberAverageTrucks * 4.87)*distanceBetweenCities)));
//        if(Float.isInfinite(smallValue)){
//            smallTruck.setValue((float) 0);
//        }else smallTruck.setValue(smallValue);
//        totalValueByModalities.add(smallTruck);         // set to array





        addCargo(totalValueToFloat, averageAmountByKm, totalByRoutes, initialAverageCostByProducts, totalTrucks, totalItems);



        // WITHOUT PITSTOP'
        return ("de "+path.getOriginCity()+" para "+path.getDestinyCity()+" , a distância a ser percorrida é de: "+distanceBetweenCities+" km," +
                " para transporte dos produtos "+totalItemsName+" será necessário utilizar ["+numberSmallTrucks+"] caminhões de porte PEQUENO, [" +numberAverageTrucks+
                "] de porte MÉDIO porte e ["+numberBigTrucks+"] de GRANDE porte, de forma a resultar no menor custo de transporte por km rodado. " +
                " O valor total do transporte dos itens é R$ "+totalValueToFloat+", sendo R$ "+averageUnityCost+" o custo unitário médio.");
    }

    public ArrayList<Cargo> getStatisticData(){

        return getCargos();
    }

    private void addCargo(float totalAmount, float averageAmountByKm, ArrayList<Route> totalByRoutes, ArrayList<Product> averageCostByProducts, int totalTrucks, int totalItems) {

        Cargo cargo = Cargo.builder()
                .totalAmount(totalAmount)
                .averageAmountByKm(averageAmountByKm)
                .totalByRoutes(totalByRoutes)
                .averageCostByProducts(averageCostByProducts)
                .averageCostByProducts(averageCostByProducts)
                .totalTrucks(totalTrucks)
                .totalItems(totalItems)
                .build();

        cargos.add(cargo);

    }

}
