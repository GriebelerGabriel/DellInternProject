import { StyleSheet, StatusBar, Dimensions } from "react-native";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64
const statusBarWidth = StatusBar.currentWidth ? StatusBar.currentWidth : 64

const mobileWindow = Dimensions.get("window");

const modalityDropDownStyle = StyleSheet.create({
    
    modalBackground:{
        flex: 1,
        backgroundColor: "grey",
        opacity: 0.9,
    },
    modalContainer:{
        marginTop: mobileWindow.height*0.111,
        position: "absolute",
        alignSelf: "center",
        height: mobileWindow.height*0.75,
    },
    originModalContainer:{
        marginTop: mobileWindow.height*0.111,
        position: "absolute",
        alignSelf: "flex-start",
        height: mobileWindow.height*0.75,
        marginStart: mobileWindow.width*0.017,
    },
    destinyModalContainer:{
        marginTop: mobileWindow.height*0.111,
        position: "absolute",
        alignSelf: "flex-end",
        height: mobileWindow.height*0.75,
        paddingEnd: mobileWindow.width*0.017,
    },
    labelModality:{
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    inputModal:{
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "center",
        width: mobileWindow.width*0.30,
        height: mobileWindow.height*0.07,
    },
    inputOriginModal:{
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "flex-start",
        width: mobileWindow.width*0.32,
        height: mobileWindow.height*0.07,
    },
    inputDestinyModal:{
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "flex-end",
        width: mobileWindow.width*0.32,
        height: mobileWindow.height*0.07,
    },
    listContainer:{
        backgroundColor: "white",
        marginTop: mobileWindow.height*0.01,
        paddingVertical: 10,
        width: mobileWindow.width*0.7,
        borderRadius: 10,
    },
    dropdownOptionContainer:{
        marginVertical: mobileWindow.height*0.01,
        alignSelf: "center",
        width: "70%",
        backgroundColor: "lightyellow",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    
})

export default modalityDropDownStyle;