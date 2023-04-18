import { useEffect, useState } from "react";
import { View, Text, Pressable} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

// Style file 
import stackedPageStyle from "../styles/stackedPageStyle";

// Component of selectable
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AddItemsPopup from "../modals/addItemsPopup";

export default function AddPitstop(props){

    const [showAddItemsPopup, setShowAddItemsPopup] = useState(false);

    return(
        <View style={stackedPageStyle.background}>
            <View style={stackedPageStyle.container}>
                <Text style={stackedPageStyle.labelParada}>Parada</Text>
                <View style={stackedPageStyle.fieldsContainer}>
                    <TextInput 
                        placeholder="Digite a Origem"
                        style={stackedPageStyle.input}
                        value={props.pitstopOriginCityText}
                        editable = {false}
                    />
                    <Pressable
                        style={stackedPageStyle.addItemsIcon}
                        onPress={() => setShowAddItemsPopup(!showAddItemsPopup)}
                    >
                        <Text>Items</Text>
                        <Ionicons name={"add-outline"} size={20}/> 
                    </Pressable>
                    <TextInput 
                        placeholder="Digite o Destino"
                        style={stackedPageStyle.input}
                        onChangeText={newText => props.setPitstopDestinyCityText(newText)}
                        defaultValue={props.pitstopDestinyCityText}
                    />
                </View>
                <View style={stackedPageStyle.productsContainer}>
                    {
                        props.pitstopItemsAndWeight.length > 0 ? 
                        props.pitstopItemsAndWeight.map(
                                (element, index) =>
                                <View key={index}> 
                                    <Text>Nome do produto: {element.itemName}</Text>
                                    <Text>Quantidade: -{element.quantity}</Text>
                                </View>
                            )
                        :
                        <Text>Não há itens selecionados</Text>
                    }
                </View>

                <AddItemsPopup
                    itemsQuantitiesWeightsList = {props.pitstopItemsAndWeight}
                    showAddItemsPopup = {showAddItemsPopup}
                    setShowAddItemsPopup = {setShowAddItemsPopup}
                    showAddPitstop = {props.showAddPitstop}
                />
            </View>

        </View>
    )
}