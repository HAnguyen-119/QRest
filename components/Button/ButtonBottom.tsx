import { ButtonNav } from "@/constants/types";
import { Animated, Pressable, Text } from "react-native";
import { styles } from '@/assets/styles/BottomNav.styles';
import { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createRootStyles } from "@/assets/styles/Root";

export default function ButtonBottom({ onPress, onLongPress, isFocused, label, icon } : ButtonNav) {
    const scale = useSharedValue(0)
    const { isDark } = useThemeContext()
    const textStyles = createRootStyles(isDark).text
    useEffect(() => {
        scale.value = withSpring(isFocused ? 1 : 0, {
            damping: 10,
            stiffness: 100
        })
    }, [isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
        return { transform: [{scale: scaleValue}]}
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])
        return { opacity }
    })
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            // style={styles.item}
        >
            <Animated.View style={animatedIconStyle}>
                {icon}
            </Animated.View>
            <Animated.Text style={[{ color: isFocused ? 'blue' : 'black' }, animatedTextStyle, textStyles]}>
                {label}
            </Animated.Text>
        </Pressable>
    )
}