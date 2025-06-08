import { StyleSheet } from "react-native"

export const createModalTableViewStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },
        scrollViewContainer: {
            flexGrow: 1,
            paddingVertical: 10,
        },
        tableGrid: {
            gap: 10, 
        },
        headerText: {
            fontSize: 32,
        }
    })
}