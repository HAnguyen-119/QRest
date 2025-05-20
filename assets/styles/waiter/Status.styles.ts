import { StyleSheet } from "react-native"

export const createStatusPageStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
        }
    })
}