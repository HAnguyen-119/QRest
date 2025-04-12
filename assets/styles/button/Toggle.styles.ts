import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createToggleStyles = (isDark: boolean) => 
    StyleSheet.create({
        container: {
            width: 100,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
        },
        track: {
            width: "100%",
            height: 46,
            backgroundColor: !isDark ? COLORS.trackLight : COLORS.trackDark,
            borderRadius: 23,
            position: "absolute",
            borderWidth: 3
        },
        thumb: {
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
        },
        toggleArea: {
            width: "100%",
            height: "100%",
            position: "absolute",
        },
    })
