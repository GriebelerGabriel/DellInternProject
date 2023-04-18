import { useEffect, useState } from "react";
import { View, Text, Pressable} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

// API -> to fetch data
import api from "../services/api"; 

// Style file 
import stackedPageStyle from "../styles/stackedPageStyle";

// Component of selectable
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AddItemsPopup from "../modals/addItemsPopup";
import AddPitstop from "../components/addPitstop";
import CityDropdown from "../modals/originCityDropdown";
import OriginCityDropdown from "../modals/originCityDropdown";
import DestinyCityDropdown from "../modals/destinyCityDropdown";


export default function CreateNewTransport({navigation}){

    // CONTROL STATES
    const [showAddItemsPopup, setShowAddItemsPopup] = useState(false);
    const [fullTripListObject, setFullTripListObject] = useState([]);
    const [showAddPitstop, setShowAddPitstop] = useState(false);
    const [showOriginCityDropdown, setShowOriginCityDropdown] = useState(false);
    const [showDestinyCityDropdown, setShowDestinyCityDropdown] = useState(false);
    const [citiesList,setCitiesList] = useState([]);
    

    // HANDLE TEXT FIELDS
        // Initial Transport
        const [itemsQuantitiesWeightsList, setItemsQuantitiesWeightsList] = useState([]);
        const [originCityText, setOriginCityText] = useState("ORIGEM");
        const [destinyCityText, setDestinyCityText] = useState("DESTINO");

        // Pitstop Transport
        const [pitstopDestinyCityText, setPitstopDestinyCityText] = useState("");
        const [pitstopItemsAndWeight, setPitstopItemsAndWeight] = useState([]);

    useEffect(() => {     
        async function getData(){
            try{
                const response = await api.get("/CargoFeeSimulator/Cities")
                setCitiesList(response.data);
            }catch(e){
                console.log(e.message)
            }
        }
        getData()
        }, []);
        
    async function sendNewTransport(){
        try{
            let finalObject = new Object();
            finalObject.paths = fullTripListObject;
            const response = await api.post("/CargoFeeSimulator/NewTransport", finalObject)
            .then(function(response){alert(response.data)}).catch(function (error) {
                console.error(error.message);
              });
            navigation.goBack();
        }catch(e){
            console.log(e.message)
        }
    }
    return(
        <ScrollView style={stackedPageStyle.background}>
            <View style={stackedPageStyle.container}>
                <View style={stackedPageStyle.fieldsContainer}>
                    <Pressable
                        style={stackedPageStyle.input}
                        onPress={() => setShowOriginCityDropdown(!showOriginCityDropdown)}
                    >
                        <Text style={stackedPageStyle.labelModality}>{originCityText}</Text> 
                    </Pressable>
                    {            
                        showOriginCityDropdown ?  
                            <OriginCityDropdown
                                showOriginCityDropdown={showOriginCityDropdown}
                                setShowOriginCityDropdown={setShowOriginCityDropdown}
                                setOriginCityText={setOriginCityText}
                                citiesList={citiesList}
                            />
                        :
                            <></>
                    }

                    <Pressable
                        style={stackedPageStyle.addItemsIcon}
                        onPress={() => setShowAddItemsPopup(!showAddItemsPopup)}
                    >
                        <Text>Itens</Text>
                        <Ionicons name={"add-outline"} size={20}/> 
                    </Pressable>

                    <Pressable
                        style={stackedPageStyle.input}
                        onPress={() => setShowDestinyCityDropdown(!showDestinyCityDropdown)}
                    >
                        <Text style={stackedPageStyle.labelModality}>{destinyCityText}</Text> 
                    </Pressable>
                    {            
                        showDestinyCityDropdown ?  
                            <DestinyCityDropdown
                                showDestinyCityDropdown={showDestinyCityDropdown}
                                setShowDestinyCityDropdown={setShowDestinyCityDropdown}
                                setDestinyCityText={setDestinyCityText}
                                citiesList={citiesList}
                            />
                        :
                            <></>
                    }
                </View>
                <View style={stackedPageStyle.productsContainer}>
                    {
                        itemsQuantitiesWeightsList.length > 0 ? 
                        itemsQuantitiesWeightsList.map(
                                (element, index) =>
                                <View key = {index}> 
                                    <Text>Nome do produto: {element.itemName}</Text>
                                    <Text>Quantidade: {element.quantity}</Text>
                                    <Text>Peso: {element.weight}</Text>
                                </View>
                            )
                        :
                        <Text>Não há itens selecionados</Text>
                    }
                </View>
                {
                    originCityText != "" && destinyCityText != "" && itemsQuantitiesWeightsList.length > 0 ?
                    <Pressable
                            style={stackedPageStyle.addPitstop}
                            onPress={
                                () => {
                                    setShowAddPitstop(!showAddPitstop)
                    
                                }}
                        >
                            <Text>Parada</Text>
                            <Ionicons name={"add-outline"} size={20}/> 
                    </Pressable>
                    :
                    <></>
                }
                {
                showAddPitstop ?
                    <AddPitstop
                        fullTripListObject = {fullTripListObject}
                        pitstopOriginCityText = {destinyCityText}
                        pitstopDestinyCityText = {pitstopDestinyCityText}
                        setPitstopDestinyCityText = {setPitstopDestinyCityText}
                        pitstopItemsAndWeight = {pitstopItemsAndWeight}
                        showAddPitstop = {showAddPitstop}
                        
                    />
                    :
                    <></>
                }
                <Pressable
                    style={stackedPageStyle.verifyButtonPressable}
                    onPress={() => {
                        if(originCityText != "" && destinyCityText != "" && itemsQuantitiesWeightsList.length > 0){
                            const path = new Object();
                                        path.originCity = originCityText
                                        path.itemsQuantitiesWeightsList = itemsQuantitiesWeightsList
                                        path.destinyCity = destinyCityText
                                        fullTripListObject.push(path)

                            // IF pitstop required
                            if(pitstopDestinyCityText != ""){
                                const pitstopPath = new Object();
                                pitstopPath.originCity = destinyCityText
                                pitstopPath.itemsQuantitiesWeightsList = pitstopItemsAndWeight
                                pitstopPath.destinyCity = pitstopDestinyCityText
                                fullTripListObject.push(pitstopPath)
                            }
                            sendNewTransport()
                        }
                    }}
                >
                    <Text style={stackedPageStyle.labelVerificar}>Confirmar</Text> 
                </Pressable>

                <AddItemsPopup
                    itemsQuantitiesWeightsList = {itemsQuantitiesWeightsList}
                    showAddItemsPopup = {showAddItemsPopup}
                    setShowAddItemsPopup = {setShowAddItemsPopup}
                    showAddPitstop = {showAddPitstop}
                />
            </View>

        </ScrollView>
    )
}