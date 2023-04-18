import { BackHandler, ImageBackground, Pressable, SafeAreaView, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'

import defaultHomePageStyle from "../styles/defaultHomePageStyle";

const image = require('../images/backgroundImageDell.png')

export default function Home({navigation}){
    return(
        <SafeAreaView style={defaultHomePageStyle.background}>
            <ImageBackground source={image} resizeMode="stretch" style={defaultHomePageStyle.backgroundImage}>
                <View style={defaultHomePageStyle.container}> 
                    <Pressable style={defaultHomePageStyle.icon1Container}
                    onPress={() => navigation.navigate('VerifyRoutesAndModality')}
                    >
                        <Ionicons name="reader-outline" style={defaultHomePageStyle.icon} size={50}/>
                    </Pressable>
                    <Pressable style={defaultHomePageStyle.icon2Container}
                    onPress={() => navigation.navigate('CreateNewTransport')}>
                        <Ionicons name="add-outline" style={defaultHomePageStyle.icon} size={50}/>
                    </Pressable>
                    <Pressable style={defaultHomePageStyle.icon3Container}
                    onPress={() => navigation.navigate('StatisticData')}>
                        <Ionicons name="stats-chart-outline" style={defaultHomePageStyle.icon} size={50}/>
                    </Pressable>
                    <Pressable style={defaultHomePageStyle.icon4Container}
                    onPress={() => BackHandler.exitApp()}
                    >
                        <Ionicons name="log-out-outline" style={defaultHomePageStyle.icon} size={50}/>
                    </Pressable>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}