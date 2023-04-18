import { View, Text, Modal, Pressable, ScrollView, SafeAreaView} from "react-native";
import { useState, useEffect} from "react";


import api from "../services/api";
import modalityDropDownStyle from "../styles/modalStyle/modalityDropDownStyle";



export default function OriginCityDropdown(props){

    return(
            <Modal
                animationType="fade"
                transparent = {true}
                visible = {props.showModalities}
                style = {modalityDropDownStyle.modalBackground}
                onRequestClose={() => {
                    props.setShowOriginCityDropdown(!props.showOriginCityDropdown);
                }}
                >

                <Pressable 
                style = {modalityDropDownStyle.modalBackground}
                onPress= {
                    () => props.setShowOriginCityDropdown(!props.showOriginCityDropdown)
                }
                >
                    <View style={modalityDropDownStyle.originModalContainer}>
                        <View style={modalityDropDownStyle.inputOriginModal}>
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
                                                props.setOriginCityText(element)
                                                props.setShowOriginCityDropdown(!props.showOriginCityDropdown)
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