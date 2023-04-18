import { StyleSheet, StatusBar, Dimensions } from "react-native";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64
const statusBarWidth = StatusBar.currentWidth ? StatusBar.currentWidth : 64

const mobileWindow = Dimensions.get("window");

const addItemsPopupStyle = StyleSheet.create({
    
    modalBackground:{
        flex: 1,
        backgroundColor: "grey",
        opacity: 0.9,
    },
    modalContainer:{
        flex: 1,
        backgroundColor: "white",
        marginBottom: mobileWindow.height*0.45,
        marginTop: mobileWindow.height*0.1,
        marginHorizontal: mobileWindow.width*0.1,
        flexDirection: "row",
        borderRadius: 10,
        position: "absolute"
    },
    inputsContainer:{
        marginVertical: mobileWindow.height*0.05,
        marginHorizontal: mobileWindow.width*0.1,
    },
    inputModal:{
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: mobileWindow.width*0.6,
        height: mobileWindow.height*0.07,
        marginVertical: mobileWindow.height*0.01,
    },
    confirmPressable:{
        backgroundColor: "pink",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: mobileWindow.height*0.1,
        width: mobileWindow.width*0.3,
        height: mobileWindow.height*0.07,
        alignSelf: "center",
    },
    confirmLabel:{
        alignSelf: "center",
        marginTop: mobileWindow.height*0.01,
    },
    

})

export default addItemsPopupStyle;