import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createTableInfoStyles = (isDark: boolean) => {
    return StyleSheet.create({
        nameContainer: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
            borderBottomWidth: 2,
            borderStyle: "solid",
            borderBottomColor: isDark ? COLORS.light : COLORS.dark,
        },
    
        infoContainer: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    
        statusContainer: {
            borderTopColor: isDark ? COLORS.light : COLORS.dark,
            borderTopWidth: 2,
            borderStyle: 'solid',
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
        },
    
        container: {
            height: 150,
            width: "43%",
            borderRadius: 10,
            borderStyle: "solid",
            borderColor: isDark ? COLORS.light : COLORS.dark,
            borderWidth: 2,
            marginLeft: 15,
            marginBottom: 15,
            overflow: "hidden",
            backgroundColor: isDark ? COLORS.dark : COLORS.light 
        },
    
        text: {
            fontFamily: "Josefin-Sans",
            color: isDark ? COLORS.light : COLORS.dark,
            fontSize: 18
        },
        statusText: {
            fontFamily: "Josefin-Sans",
            fontSize: 18
        },

        icon: {
            color: isDark ? COLORS.light : COLORS.dark,
        },

        button: {
            flex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderLeftColor: isDark ? COLORS.light : COLORS.dark,
            borderLeftWidth: 2,
            borderStyle: "solid",
        }
    })
}