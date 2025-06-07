import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const notificationModalStyles = (isDark: boolean) => {
    return StyleSheet.create({
        modalBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)'
        },
        modalView: {
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            borderRadius: 12,
            padding: 24,
            minWidth: 220,
            alignItems: 'center'
        },
        modalSuccessText: {
            fontSize: 18,
            color: COLORS.modalSuccessText,
            marginBottom: 12
        },
        modalFailureText:
        {
            fontSize: 18,
            color: COLORS.modalFailureText,
            marginBottom: 12
        },
        closeButton: {
            color: COLORS.closeModalReservationButton,
        }
    })
}