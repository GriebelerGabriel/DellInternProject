import { View, Text, Modal, Pressable, ScrollView, SafeAreaView} from "react-native";
import { useState, useEffect} from "react";


import api from "../services/api";
import modalityDropDownStyle from "../styles/modalStyle/modalityDropDownStyle";



export default function DestinyCityDropdown(props){

    const [cities, setCities] = useState([]);

    useEffect(() => {     
        async function getData(){
            try{
                const response = await api.get("/CargoFeeSimulator/Cities")
                setCities(response.data);
            }catch(e){
                console.log(e.message)
            }
        }
        getData()
        }, []);

    return(
            <Modal
                animationType="fade"
                transparent = {true}
                visible = {props.showModalities}
                style = {modalityDropDownStyle.modalBackground}
                onRequestClose={() => {
                    props.setShowDestinyCityDropdown(!props.showDestinyCityDropdown);
                }}
                >

                <Pressable 
                style = {modalityDropDownStyle.modalBackground}
                onPress= {
                    () => props.setShowDestinyCityDropdown(!props.showDestinyCityDropdown)
                }
                >
                    <View style={modalityDropDownStyle.destinyModalContainer}>
                        <View style={modalityDropDownStyle.inputDestinyModal}>
                            <Text style={modalityDropDownStyle.labelModality}>{props.defaultValueModality}</Text>
                        </View>
                        <SafeAreaView style={modalityDropDownStyle.listContainer}>
                            <ScrollView>
                                {
                                props.citiesList.map(
                                    (element, index) =>
                                        <Pressable
                                            style={modalityDropDownStyle.dropdownOptionContainer}
                                            key = {index}
                                            onPress={
                                                () => {
                                                props.setDestinyCityText(element)
                                                props.setShowDestinyCityDropdown(!props.showDestinyCityDropdown)
                                                }}
                                            >
                                                <Text>{element}</Text>
                                        </Pressable>
                                    )
                                }
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </Pressable>
            </Modal>
    )
}