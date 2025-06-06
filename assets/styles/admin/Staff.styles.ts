import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";

export const createStaffStyles = (isDark : boolean) => {
    return StyleSheet.create({
        text: {
            fontFamily: "Josefin-Sans",
            color: isDark ? COLORS.light : COLORS.dark
        },

        name: {
            fontSize: 20,
        },

        position: {
            fontSize: 20,
        },

        buttonContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "center",
            gap: 10,

        },

        button: {
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 30,
            backgroundColor: COLORS.buttonActive,
            borderRadius: 15,
            position: "relative",
            right: 20,
            top: 10,
        },

        expand: {
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            width: 30,
            height: 30,
            position: "absolute",
            bottom: 0,
        },

        buttonText: {
            fontFamily: "Josefin-Sans",
            color: "white",
        },

        staffInfo: {
            display: 'flex',
            flexDirection: 'row',
            width: '85%',
            alignSelf: 'center',
            borderWidth: 2,
            borderColor: isDark ? COLORS.light : COLORS.dark,
            borderRadius: 20,
            borderStyle: 'solid',
            marginBottom: 15,
            overflow: 'hidden',
        },

        staffImageContainer: {
            flex: 1,
        },

        staffImage: {

        },
    })
}