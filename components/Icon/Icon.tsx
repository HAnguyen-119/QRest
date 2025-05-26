// import { ToggleType } from "@/constants/types";
import { IconStyles } from "@/assets/styles/IconCount.styles";
import { ToggleType } from "@/constants/Types/function";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";

export default function Icon({ src, width, height, count } : ToggleType) {
    return (
        <View style={{width, height}}>
            <Animated.Image 
                source={src}
                style={{ width: width, height: height }}
            />
            {count !== null && count !== undefined && count > 0 && (
                <View style={IconStyles.badge}>
                    <Text style={IconStyles.badgeText}>{count}</Text>
                </View>
            )}
        </View>
    )
}