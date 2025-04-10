import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createOrderListStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            margin: 12,
            paddingHorizontal: 20,
            
        },
        scrollView: {
            margin: 12,
            height: 120,
            paddingHorizontal: 20,
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
        }
    })
}