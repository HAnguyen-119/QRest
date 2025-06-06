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
            borderColor: isDark ? COLORS.light : COLORS.dark,
            flexDirection: 'row'
        },
        infoContainer: {
            width: '75%'
        },
        customerName: {
            fontSize: 22
        },
        reserveContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '25%',
        },
        reserveButton: {
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: COLORS.reserveButton
        },
        confirm: {
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: COLORS.confirmSection
        },
        confirmText: {
            fontSize: 16
        },
        reserveText: {
            fontSize: 16
        },
        modalBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        modalContainer: {
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            paddingVertical: 32,
            paddingHorizontal: 20,
            borderWidth: 2,
            borderRadius: 12,
            borderColor: isDark ? COLORS.light : COLORS.dark,
            gap: 16
        },
        modalConfirmText: {
            fontSize: 20,
        },
        buttonView: {
            flexDirection: 'row',
            gap: 40,
            justifyContent: 'center',
            alignContent: 'center'
        },
        button: {
            
        },
        confirmButton: {

        },
        rejectButton: {

        }
    })
}