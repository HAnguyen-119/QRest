import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const createRootStyles = (isDark : boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? COLORS.light : COLORS.dark
        },
        text: {
            color: isDark ? COLORS.light : COLORS.dark
        }
    })