import React from "react"
import Toggle from 'react-native-toggle-element'
import { Text } from "react-native"

import sun from '@/assets/images/sun.png'
import moon from '@/assets/images/moon.png'
import Icon from "../Icon/Icon"
import { ICONSIZE } from "@/constants/size"
import { useThemeContext } from "@/contexts/ThemeContext"

export default function ToggleButton() {
    const { isDark, toggle } = useThemeContext()

    return (
        <>
            <Toggle
                value={isDark}
                onPress={toggle}
                leftComponent={
                    !isDark && <Icon src={sun} width={ICONSIZE.width} height={ICONSIZE.height} />
                }
                rightComponent={
                    isDark && <Icon src={moon} width={ICONSIZE.width} height={ICONSIZE.height} />
                }
                trackBar={{
                    inActiveBackgroundColor: "#9ee3fb",
                    activeBackgroundColor: "#3c4145",
                    borderInActiveColor: "#86c3d7",
                    borderActiveColor: "#1c1c1c",
                    borderWidth: 4,
                    width: 100,
                    height: 44, 
                }}
            />
        </>
    )
}