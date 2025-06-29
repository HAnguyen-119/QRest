import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createOrderListStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
        },
        comboContainer: {
            backgroundColor: isDark ? COLORS.gray : COLORS.containerBackground,
            borderBottomWidth: 2
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
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
            borderWidth: 2,
            borderRadius: 20,
            paddingLeft: 12,
            gap: 8,
            marginHorizontal: 16,
            flexWrap: 'wrap'
        },
        textInput: {
            fontFamily: 'Josefin-Sans'
        },
        reservationButton: {
            margin: 12, 

        },
        closeButton: {
            margin: 12,
            alignSelf: 'flex-end'
        },
        nextButton: {
            alignSelf: 'flex-end',
            margin: 12,
        },
        summary: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        total: {
            textAlign: 'center',
            fontSize: 24,
        },
        details: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 32,
            padding: 8,
        },
        expandButton: {
            alignSelf: 'center',
            position: 'absolute',
            top: 12,
        },
        foodItemContainer: {
            padding: 8,
            borderBottomWidth: 1,
            borderBottomColor: "lightgray",
        },
        foodName: {
            fontSize: 16,
            fontWeight: "bold",
            color: isDark ? "white" : "black",
        },
        foodDescription: {
            fontSize: 14,
            color: isDark ? "lightgray" : "gray",
            marginTop: 4,
        },
        orderView: {
            height: '80%',
            paddingVertical: 32
        }
    })
}