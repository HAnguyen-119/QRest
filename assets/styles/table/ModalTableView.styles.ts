import { StyleSheet } from "react-native"

export const createModalTableViewStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            height: '100%'
        },
        tableView: {
            height: 600,
        }
    })
}