import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";

export const createAccountStyles = (isDark: boolean) => {
    return StyleSheet.create({
        nameContainer: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
            borderBottomWidth: 2,
            borderStyle: "solid",
            borderBottomColor: isDark ? COLORS.light : COLORS.dark,
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
            flex: 1,
            backgroundColor: isDark ? COLORS.dark : COLORS.light
        },

        infoContainer: {
            height: 70,
            width: "85%",
            borderRadius: 10,
            borderStyle: "solid",
            borderColor: isDark ? COLORS.light : COLORS.dark,
            borderWidth: 2,
            alignSelf: "center",
            marginBottom: 15,
            overflow: "hidden",
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            display: "flex",
            flexDirection: "row",
        },

        role: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderStyle: "solid",
            borderRightWidth: 2,
            borderRightColor: isDark ? COLORS.light : COLORS.dark,
        },

        user: {
            flex: 3,
        },

        text: {
            fontFamily: "Josefin-Sans",
            color: isDark ? COLORS.light : COLORS.dark,
        },

        icon: {
            color: isDark ? COLORS.light : COLORS.dark,
        },

        button: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderLeftColor: isDark ? COLORS.light : COLORS.dark,
            borderLeftWidth: 2,
            borderStyle: "solid",
        },

        picker: {
            width: "120%",
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
            width: "120%",
            zIndex: 6,
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            borderColor: isDark ? COLORS.light : COLORS.dark,

        },

        accountContainer: {
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
        },

        categories: {
            alignSelf: "center",
            width: "50%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginVertical: 7
        }
    })
}