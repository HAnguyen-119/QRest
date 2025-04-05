import {Image, View} from "react-native";

export default function Logo() {
    return (
        <View style={{position: "absolute", left:-15, width: 150, height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Image
                source={require('@/assets/images/logo.png')} // local image
                resizeMode="contain"
                style={{ width: '70%', height: "100%" }}
            />
        </View>
    )
}