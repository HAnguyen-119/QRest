import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createReservationFormStyles = (isDark : boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? COLORS.dark : COLORS.light
        },
    })
}