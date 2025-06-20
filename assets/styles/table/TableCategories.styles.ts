import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createTableCategoriesStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            width: "40%",
            height: 65,
            marginBottom: 15,
            // borderWidth: 2,
            // borderStyle: "solid",
            // borderColor: isDark ? COLORS.light : COLORS.dark,
            // borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginHorizontal: 10
        },
    
        item: {
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderStyle: "solid",
        },
    
        text: {
            fontFamily: "Josefin-Sans",
            color: isDark ? COLORS.light : COLORS.dark
        },

        picker: {
            width: '70%',
            borderWidth: 2,
            borderRadius: 15,
            fontFamily: "Josefin-Sans",
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            borderColor: isDark ? COLORS.light : COLORS.dark,
            zIndex: 6
        },

        arrow: {
            color: isDark ? COLORS.light : COLORS.dark,
        },

        dropdown: {
            width: '70%',
            zIndex: 6,
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            borderColor: isDark ? COLORS.light : COLORS.dark,

        },
    })
}