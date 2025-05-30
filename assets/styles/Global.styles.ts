import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const createGlobalStyles = (isDark: boolean) => {
    return StyleSheet.create({
        text: {
            color: isDark ? COLORS.light : COLORS.dark,
            fontFamily: 'Josefin-Sans'
        },
        textInverse: {
            color: isDark ? COLORS.dark : COLORS.light,
            fontFamily: 'Josefin-Sans'
        },
        textBold: {
            color: isDark ? COLORS.light : COLORS.dark,
            fontFamily: 'Josefin-Sans-Bold'
        },
        background: {
            backgroundColor: isDark ? COLORS.dark : COLORS.light
        }
    })
}