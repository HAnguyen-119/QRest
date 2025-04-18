import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createOrderListStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
        },
        scrollView: {
            height: 540,
            flexGrow: 1
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.modalBackground, 
        },
        modalContent: {
            flex: 1,
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            alignSelf: 'center',
            width: '100%'
        },
        noteContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 20,
            paddingLeft: 12,
            gap: 8,
            marginHorizontal: 16,
            flexWrap: 'wrap'
        },
        textInput: {
            fontFamily: 'Josefin-Sans'
        },
        closeButton: {
            margin: 12,
            alignSelf: 'flex-end'
        },
        nextButton: {
            alignSelf: 'flex-end',
            justifyContent: 'center',
            marginBottom: 12,
        },
        summary: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        total: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        },
        details: {
            borderWidth: 2,
            borderRadius: 8,
            margin: 12,
            padding: 8,
        }
    })
}