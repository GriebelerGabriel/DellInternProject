import { Pressable, Text } from "react-native";
import { View } from "react-native";
import listScreen from "../styles/listScreen";

export default function CityAndDistancesOptions(props){
    return(
            <View style={listScreen.originAndDestinyContent}>
                <View style={listScreen.titleContainer}>
                    <Text style={listScreen.labelOrigin}>ORIGEM:</Text>
                    <Text style={listScreen.labelOriginCityName}>{props.cityName}</Text>
                </View>
                <View style={listScreen.destinyContainer}>
                    <Text style={listScreen.labelDestinies}>DESTINOS:</Text>
                    <View style={listScreen.destinyContent}>
                    {
                    props.destinyCityAndDistances.map(
                            (index, key) => 
                                <Text key={key} style={listScreen.labelDestinyName}>{index}</Text> 
                        )
                    }
                    </View>
                </View>
            </View>
    )
}