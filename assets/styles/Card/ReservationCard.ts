import { StyleSheet } from "react-native"

export const createReservationCardStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            borderWidth: 2,

        },
        customerName: {
            fontSize: 22
        }
    })
}