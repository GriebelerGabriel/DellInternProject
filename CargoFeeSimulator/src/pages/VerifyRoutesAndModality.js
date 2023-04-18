import { useEffect, useState } from "react";
import { View, Text, Pressable} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

// API -> to fetch data
import api from "../services/api"; 

// Style file 
import stackedPageStyle from "../styles/stackedPageStyle";

// Component of selectable
import CityAndDistancesOptions from "../components/CityAndDistancesOptions";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import ModalityDropDown from "../modals/modalityDropDown";



export default function VerifyRoutesAndModality({navigation}){
    const [destinyCityAndDistances, setDestinyCityAndDistances] = useState([]);
    const [showDestinyAndDistances, setShowDestinyAndDistances] = useState(false);
    const [showModalities, setShowModalities] = useState(false);

    // HANDLE TEXT FIELDS
    const [defaultValueModality, setDefaultValueModality] = useState("")
    const [originCityText, setOriginCityText] = useState("")
    const [destinyCityText, setDestinyCityText] = useState("")

    useEffect(() => {     
        async function getData(){
            try{
                const cities = await api.get("/CargoFeeSimulator/Cities")
                console.log(cities.data)
                setDestinyCityAndDistances(cities.data);
            }catch(e){
                console.log(e.message)
            }
        }
        getData()
        }, []);
        
    async function verifyRouteAndValue(){
        try{
            const response = await api.get("/CargoFeeSimulator/"+originCityText+"/"+defaultValueModality+"/"+destinyCityText)
            alert(response.data)
        }catch(e){
            console.log(e.message)
        }
    }
    return(
        <ScrollView style={stackedPageStyle.background}>
            <View style={stackedPageStyle.container}>

                <View style={stackedPageStyle.fieldsContainer}>
                    <TextInput 
                        placeholder="Digite a Origem"
                        style={stackedPageStyle.input}
                        onChangeText={newText => setOriginCityText(newText)}
                        defaultValue={originCityText}
                    />
                    
                    <Pressable
                        style={stackedPageStyle.input}
                        onPress={() => setShowModalities(!showModalities)}
                    >
                        <Text style={stackedPageStyle.labelModality}>{defaultValueModality}</Text> 
                    </Pressable>
                    {            
                        showModalities ?  
                            <ModalityDropDown
                                showModalities={showModalities}
                                setShowModalities={setShowModalities}
                                setDefaultValueModality={setDefaultValueModality}
                                defaultValueModality={defaultValueModality}
                            />
                        :
                            <></>
                    }
                
                    <TextInput 
                        placeholder="Digite o Destino"
                        style={stackedPageStyle.input}
                        onChangeText={newText => setDestinyCityText(newText)}
                        defaultValue={destinyCityText}
                    />
                </View>

                    <Pressable
                        style={stackedPageStyle.verifyButtonPressable}
                        onPress={() => verifyRouteAndValue()}
                    >
                        <Text style={stackedPageStyle.labelVerificar}>Verificar</Text> 
                    </Pressable>
                


                <View style={stackedPageStyle.pressableContainer}>
                    <Pressable
                            style={stackedPageStyle.showDestinyAndDistancesPressable}
                            onPress={() => setShowDestinyAndDistances(!showDestinyAndDistances)}
                        >
                            <Text style={stackedPageStyle.labelShowRoutes}>
                                MOSTRAR ROTAS E MODALIDADES     </Text>
                            <View>
                                {
                                    showDestinyAndDistances ? 
                                        <Ionicons name={"chevron-down-outline"}  size={20}/>
                                    : 
                                        <Ionicons name={"chevron-forward-outline"} size={20}/> 
                                }
                            </View>
                    </Pressable>
                </View>
                <View style={stackedPageStyle.cityAndDistanceOptionsContainer}>
                {
                    showDestinyAndDistances ?
                    destinyCityAndDistances.length > 0 ?
                        destinyCityAndDistances.map(
                            (destinyCityAndDistance, index) => 
                            <CityAndDistancesOptions
                                cityName = {destinyCityAndDistance.name}
                                destinyCityAndDistances = {destinyCityAndDistances}
                                key = {index}
                            />
                    )
                    :
                        <></>
                        :
                        <></>
                    }
                </View>
            </View>

        </ScrollView>
    )
}