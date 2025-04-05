// import { ToggleType } from "@/constants/types";
import { ToggleType } from "@/constants/types";
import { Image } from "react-native";   
import Animated from "react-native-reanimated";

export default function Icon({ src, width, height } : ToggleType) {
    return (
        <Animated.Image 
            source={src}
            style={{ width: width, height: height }}
        />
    )
}