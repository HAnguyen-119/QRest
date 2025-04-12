import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createTableInfoStyles = (isDark: boolean) => {
    return StyleSheet.create({
        nameContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 2,
            borderStyle: "solid",
            borderBottomColor: isDark ? COLORS.light : COLORS.dark,
        },
    
        infoContainer: {
            flex: 4,
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
            height: 120,
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
            color: isDark ? COLORS.light : COLORS.dark
        },
        statusText: {
            fontFamily: "Josefin-Sans",
        }
    })
}