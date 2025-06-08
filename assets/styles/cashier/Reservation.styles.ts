import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createReservationViewStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            gap: 12,
            flex: 1
        },
        text: {
            fontSize: 16,
        },
        input: {
            borderWidth: 2,
            borderRadius: 16,
            paddingHorizontal: 8,
            color: isDark ? COLORS.light : COLORS.dark,
            borderColor: isDark ? COLORS.light : COLORS.dark,
            fontFamily: 'Josefin-Sans'
        },
        modalContainer: {
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            flex: 1,
            paddingHorizontal: 20,
            gap: 0,
        },
        popupBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)'
        },
        popupView: {
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            borderRadius: 12,
            padding: 24,
            minWidth: 220,
            alignItems: 'center'
        },
        popupSuccessText: {
            fontSize: 18,
            color: COLORS.modalSuccessText,
            marginBottom: 12
        },
        popupFailureText:
        {
            fontSize: 18,
            color: COLORS.modalFailureText,
            marginBottom: 12
        },

        closeButton: {
            color: COLORS.closeModalReservationButton,
        },
        navigateButton: {
            alignSelf: 'flex-end',
            margin: 20,
        },
        headerCreateForm: {
            fontSize: 24,
            textAlign: 'center',
            marginVertical: 16,
        },
        calendarSection: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12
        },
        arrivalText: {
            marginBottom: 12
        },
        tablesSelected: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.selectedTable,
            borderRadius: 16,
            paddingHorizontal: 10,
            paddingVertical: 4,
            marginRight: 6,
            marginBottom: 6,
        },
        createButton: {
            textAlign: 'center',
            fontSize: 20,
            marginBottom: 16,
        }
    })
}