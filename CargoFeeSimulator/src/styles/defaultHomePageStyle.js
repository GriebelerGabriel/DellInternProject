import { StyleSheet, StatusBar, Dimensions } from "react-native";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64
const statusBarWidth = StatusBar.currentWidth ? StatusBar.currentWidth : 64

const mobileWindow = Dimensions.get("window");

const defaultHomePageStyle = StyleSheet.create({
    
    background:{
        flex: 1,
        marginTop: statusBarHeight
    },
    backgroundImage:{
        flex: 1,
        justifyContent: 'center',
    },
    container:{
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-evenly"
    },
    icon1Container:{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,
        marginStart: -mobileWindow.width*0.15,
        marginTop: mobileWindow.height*0.04,
        elevation: 17,
        borderWidth: 1,
    },
    icon2Container:{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,
        marginStart: -mobileWindow.width*0.2,
        marginTop: -mobileWindow.height*0.1,
        elevation: 17,
        borderWidth: 1,
    },
    icon3Container:{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,
        marginStart: -mobileWindow.width*0.25,
        marginTop: -mobileWindow.height*0.1,
        elevation: 17,
        borderWidth: 1,
    },
    icon4Container:{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,
        marginStart: mobileWindow.width*0.15,
        marginTop: -mobileWindow.height*0.12,
        elevation: 17,
        borderWidth: 1,
    },
    

})

export default defaultHomePageStyle;