import { StyleSheet } from "react-native"

export const createTableItemStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            borderWidth: 1,
            borderRadius: 8,
            flexDirection: 'row',
        },
        imageContainer: {
            width: 88,
            height: 88
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
        },
        checkbox: {
            position: "absolute",
            top: 10,
            right: 10,
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
        },
        checkboxTick: {
            color: "#007BFF",
            fontSize: 14,
            fontWeight: "bold",
        },
        tableInfo: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70%'
        },
        tableName: {
            fontSize: 24
        }
    })
}