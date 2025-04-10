import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"

import sun from '@/assets/images/sun.png'
import moon from '@/assets/images/moon.png'
import Icon from "../Icon/Icon"
import { ICONSIZE } from "@/constants/size"
import { useThemeContext } from "@/contexts/ThemeContext"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { createToggleStyles } from "@/assets/styles/button/Toggle.styles"

export default function ToggleButton() {
    const { isDark, toggle } = useThemeContext()
    const ToggleStyles = createToggleStyles(isDark)

    const translateX = useSharedValue(0)

    useEffect(() => {
        translateX.value = withTiming(isDark ? 54 : 0, { duration: 300 })
    }, [isDark])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }]
    }))

    return (
        <View style={ToggleStyles.container}>
            <View style={ToggleStyles.track}>
                <Animated.View style={[ToggleStyles.thumb, animatedStyle]}>
                    <Icon src={isDark ? moon : sun} width={ICONSIZE.width} height={ICONSIZE.height} count={null}/>
                </Animated.View>
            </View>
            <View style={ToggleStyles.toggleArea} onTouchEnd={toggle} />
        </View>
    )
}
