import { StyleSheet, StatusBar, Dimensions } from "react-native";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64
const statusBarWidth = StatusBar.currentWidth ? StatusBar.currentWidth : 64

const mobileWindow = Dimensions.get("window");

const listScreen = StyleSheet.create({

    originAndDestinyContent:{
        borderWidth: 1,
        margin: 5,
        elevation:2,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: mobileWindow.height*0.05,
        backgroundColor: "white"
    },
    destinyContainer:{
        borderTopWidth: 1,
        flexDirection: "column",
        alignContent: "space-around",
        flex: 1,
    },
    destinyContent:{
        marginVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    titleContainer:{
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    labelOrigin:{
        fontWeight: "bold",
    },
    labelOriginCityName:{
        marginHorizontal: mobileWindow.width*0.1,
        fontWeight: "bold",
    },
    labelDestinies:{
        fontWeight: "bold",
        paddingTop: 10,
    },
    labelDestinyName:{
        color: "grey",
        marginHorizontal: 5,
        marginVertical: 2,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    
})

export default listScreen;