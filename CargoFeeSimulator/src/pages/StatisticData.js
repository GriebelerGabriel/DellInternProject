import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable} from "react-native";

import api from "../services/api";

// Style file 
import stackedPageStyle from "../styles/stackedPageStyle";

export default function StatisticData({navigation}){

    const [statisticsList, setStatisticsList] = useState([]);

    useEffect(() => {     
        async function getData(){
            try{
                const response = await api.get("/CargoFeeSimulator/Statistics")
                setStatisticsList(response.data)
            }catch(e){
                console.log(e.message)
            }
        }
        getData()
        }, []);

    return(
        <View style={stackedPageStyle.background}>
            <View style={stackedPageStyle.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        statisticsList.map(
                            (item, index) => 
                            <View key={index} style={stackedPageStyle.dataContent}>
                                <Text style={stackedPageStyle.labelNumberCreate}>CADASTRO DE NÚMERO {index+1}</Text>
                                <Text style={stackedPageStyle.labelData}>Custo total: {item.totalAmount}</Text>
                                <Text style={stackedPageStyle.labelData}>Custo médio por km: {item.averageAmountByKm}</Text>
                                <Text style={stackedPageStyle.labelData}>Número total de veículos deslocados: {item.totalTrucks}</Text>
                                <Text style={stackedPageStyle.labelData}>O total de itens transportados: {item.totalItems}</Text>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        </View>
    )
}