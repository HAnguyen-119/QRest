import {Image, View} from "react-native";

export default function Logo() {
    return (
        <View style={{position: "absolute", left: "-10%", width: 150, height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Image
                source={require('@/assets/images/restaurant.png')}
                resizeMode="contain"
                style={{ width: '50%', height: "80%" }}
            />
        </View>
    )
}