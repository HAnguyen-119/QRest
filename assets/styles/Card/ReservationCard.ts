import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createReservationCardStyles = (isDark: boolean) => {
    return StyleSheet.create({
        listContainer: {
            backgroundColor: isDark ? COLORS.dark : COLORS.light
        },

        container: {
            flex: 1,
            borderWidth: 2,
            margin: 16,
            backgroundColor: isDark ? COLORS.cardContainerDark : COLORS.cardContainerLight,
            padding: 12,
            borderRadius: 20,
            borderColor: isDark ? COLORS.light : COLORS.dark
        },
        customerName: {
            fontSize: 22
        }
    })
}