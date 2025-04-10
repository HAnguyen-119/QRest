import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createTableCategoriesStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            width: "40%",
            height: 65,
            marginBottom: 15,
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: isDark ? COLORS.light : COLORS.dark,
            borderRadius: 10,
        },
    
        item: {
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderStyle: "solid",
        },
    
        text: {
            fontFamily: "Josefin-Sans",
            color: isDark ? COLORS.light : COLORS.dark
        }
    })
}