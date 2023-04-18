import { View, Text, Modal, Pressable} from "react-native";
import modalityDropDownStyle from "../styles/modalStyle/modalityDropDownStyle";
import Ionicons from '@expo/vector-icons/Ionicons'


export default function ModalityDropDown(props){

    const small = "Caminhão de pequeno porte";
    const avrage = "Caminhão de médio porte";
    const big = "Caminhão de grande porte";

    return(
            <Modal
                animationType="fade"
                transparent = {true}
                visible = {props.showModalities}
                style = {modalityDropDownStyle.modalBackground}
                onRequestClose={() => {
                    props.setShowModalities(!props.showModalities);
                }}
                >

                <Pressable 
                style = {modalityDropDownStyle.modalBackground}
                onPress= {
                    () => props.setShowModalities(!props.showModalities)
                }
                >
                    <View style={modalityDropDownStyle.modalContainer}>
                        <View style={modalityDropDownStyle.inputModal}>
                            <Text style={modalityDropDownStyle.labelModality}>{props.defaultValueModality}</Text>
                        </View>
                        <View style={modalityDropDownStyle.listContainer}>
                            <Pressable
                                style={modalityDropDownStyle.dropdownOptionContainer}
                                onPress={() => {
                                    props.setShowModalities(!props.showModalities)
                                    props.setDefaultValueModality(small)
                                }}
                            >
                                <Text>Caminhão de pequeno porte</Text>
                            </Pressable>
                            <Pressable
                                style={modalityDropDownStyle.dropdownOptionContainer}
                                onPress={() => {
                                    props.setShowModalities(!props.showModalities)
                                    props.setDefaultValueModality(avrage)
                                }}
                            >
                                <Text>Caminhão de médio porte</Text>
                            </Pressable>
                            <Pressable
                                style={modalityDropDownStyle.dropdownOptionContainer}
                                onPress={() => {
                                    props.setShowModalities(!props.showModalities)
                                    props.setDefaultValueModality(big)
                                }}
                            >
                                <Text>Caminhão de grande porte</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
    )
}