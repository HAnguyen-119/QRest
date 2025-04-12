import { ButtonNav } from "@/constants/types";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from '@/assets/styles/button/BottomNav.styles';
import Animated, { FadeIn, FadeOut, interpolate, LinearTransition, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/constants/colors";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export default function ButtonBottom({ onPress, onLongPress, isFocused, label, icon } : ButtonNav) {    
    const { isDark } = useThemeContext()
    return (
        <AnimatedTouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabItem, { backgroundColor: isFocused ? COLORS.light : 'transparent'} ]}
            layout={LinearTransition.springify().mass(0.5)}
            activeOpacity={1}
        >
            <View>
                {icon}
            </View>
            { isFocused &&
                <Animated.Text 
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={[{color: isFocused ? COLORS.dark : isDark ? COLORS.light : COLORS.dark}, styles.text]}
                >
                    {label}
                </Animated.Text>
            }   
        </AnimatedTouchableOpacity>
    )
}