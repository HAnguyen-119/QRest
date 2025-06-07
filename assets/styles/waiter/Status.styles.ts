import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createStatusPageStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
        },
        headerText: {
            fontSize: 32,
        },
        footerText: {
            marginBottom: 20,
            color: COLORS.gray
        }
    })
}