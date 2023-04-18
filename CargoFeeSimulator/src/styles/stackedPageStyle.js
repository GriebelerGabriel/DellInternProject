import { StyleSheet, StatusBar, Dimensions } from "react-native";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64
const statusBarWidth = StatusBar.currentWidth ? StatusBar.currentWidth : 64

const mobileWindow = Dimensions.get("window");

const stackedPageStyle = StyleSheet.create({
    
    background:{
        flex: 1,
        backgroundColor: "white"
    },
    container:{
        flex: 1,
        backgroundColor: "lightgreen",
    },
    fieldsContainer:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: mobileWindow.height*0.03,
        marginHorizontal: mobileWindow.width*0.015,
    },
    input:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        height: mobileWindow.height*0.07,
        width: mobileWindow.width*0.32,
        backgroundColor: "white",
        color: "black",
    },
    verifyButtonPressable:{
        backgroundColor: "pink",
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: "center",
        width: mobileWindow.width*0.4,
        height: mobileWindow.height*0.055,
        marginVertical: mobileWindow.height*0.02,

    },
    labelShowRoutes:{
        fontWeight: "bold"
    },
    pressableContainer: {
        flex: 1,
        alignSelf: "center",
    },
    showDestinyAndDistancesPressable:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cityAndDistanceOptionsContainer:{
        flexDirection: "row",
        flexWrap: "wrap",
    },
    labelModality:{
        width: mobileWindow.width*0.25,
        marginStart: mobileWindow.width*0.05,
    },
    labelVerificar:{
        fontWeight: "bold",
        alignSelf: "center",
        paddingVertical: mobileWindow.height*0.012,
    },
    productsContainer:{
        backgroundColor: "lightyellow",
        marginBottom: mobileWindow.height*0.02,
    },
    addItemsIcon:{
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        backgroundColor: "white",
    },
    addPitstop:{
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: mobileWindow.height*0.02

    },
    labelParada:{
        marginStart: mobileWindow.width*0.02,
        fontSize: 18,
        fontWeight: "bold",
    },
    labelHistórico:{
        marginStart: mobileWindow.width*0.02,
        marginTop: mobileWindow.width*0.02,
        fontSize: 18,
        fontWeight: "bold",
    },
    dataContainer:{
        marginVertical: mobileWindow.height*0.1,
        backgroundColor: "white",
    },
    dataContent:{
        marginVertical: mobileWindow.height*0.03,
        paddingStart: mobileWindow.width*0.03,
        backgroundColor: "white",
    },
    labelNumberCreate:{
        color: "brown",
        marginBottom: mobileWindow.height*0.02,
    },
    labelData:{
        color: "black",
        marginBottom: mobileWindow.height*0.02,
    },

})

export default stackedPageStyle;