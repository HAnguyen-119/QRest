import { StyleSheet } from "react-native"

export const createReservationViewStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {},
        text: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        input: {
            borderWidth: 1,
        },
    })
}