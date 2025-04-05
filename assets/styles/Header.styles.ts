import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: COLORS.primary,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    button: {
        marginHorizontal: 12
    },

    text: {
        fontFamily: "Josefin-Sans",
        color: COLORS.light
    }
})