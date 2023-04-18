import { View, TextInput, Modal, Pressable, Text} from "react-native";
import { useState } from "react";

// Style
import addItemsPopupStyle from "../styles/modalStyle/addItemsPopupStyle";


export default function AddItemsPopup(props){

    const [itemNameText, setItemNameText] = useState("")
    const [itemQtdText, setItemQtdText] = useState("")
    const [itemWeightText, setItemWeightText] = useState("")

    return(
            <Modal
                animationType="fade"
                transparent = {true}
                visible = {props.showAddItemsPopup}
                style = {addItemsPopupStyle.modalBackground}
                onRequestClose={() => {
                    props.setShowAddItemsPopup(!props.showAddItemsPopup);
                }}
                >

                <Pressable 
                style = {addItemsPopupStyle.modalBackground}
                onPress= {
                    () => props.setShowAddItemsPopup(!props.showAddItemsPopup)
                }
                >
                    <View style={addItemsPopupStyle.modalContainer}>
                        <View style={addItemsPopupStyle.inputsContainer}>
                            <TextInput 
                                placeholder="Item"
                                style={addItemsPopupStyle.inputModal}
                                onChangeText={newText => setItemNameText(newText)}
                                defaultValue={itemNameText}
                            />
                            <TextInput 
                                placeholder="Quantidade"
                                style={addItemsPopupStyle.inputModal}
                                onChangeText={newText => setItemQtdText(newText)}
                                defaultValue={itemQtdText}
                                keyboardType={"numeric"}
                            />
                            {
                                props.showAddPitstop ? <Text>Obs: Quantidade a ser retirada</Text>
                                :
                                <TextInput 
                                placeholder="Peso(Kg)"
                                style={addItemsPopupStyle.inputModal}
                                onChangeText={newText => setItemWeightText(newText)}
                                defaultValue={itemWeightText}
                                keyboardType={"numeric"}
                                />
                            }

                                <Pressable
                                    style={addItemsPopupStyle.confirmPressable}
                                    onPress={() => {
                                        if(itemNameText != "" && itemQtdText != ""){
                                            const item = new Object();
                                            item.itemName = itemNameText
                                            item.quantity = itemQtdText
                                            if(itemWeightText == ""){
                                                item.weight = "0"
                                            }
                                            else item.weight = itemWeightText
                                            props.itemsQuantitiesWeightsList.push(item);
                                            props.setShowAddItemsPopup(!props.showAddItemsPopup);
                                        }
                                        else alert("Preencha todos os campos!")
                                    }}
                                >
                                    <Text style={addItemsPopupStyle.confirmLabel}>Confirmar</Text>
                                </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
    )
}