import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createReservationFormStyles = (isDark : boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? COLORS.dark : COLORS.light
        },
        notificationText: {
            textAlign: 'center',
            marginTop: 200,
            fontSize: 20
        },
        closeButton: {
            alignSelf: 'flex-end',
            margin: 16
        }
    })
}