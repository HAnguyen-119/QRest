import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";

export const menuStyles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.light,
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 10,
    },

    text: {
        fontFamily: "Josefin-Sans",
    },

    imageContainer: {
        width: "100%",
        height: 400,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    backButton: {
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: 70,
        height: 30,
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 11,
    },

    editButton: {
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: 70,
        height: 30
    },

    nameContainer: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        height: 50,
        borderRadius: 40,
        backgroundColor: COLORS.buttonActive,
        position: "relative",
        bottom: 25,
    },

    name: {
        color: COLORS.light,
        fontSize: 25
    },

    detailsContainer: {
        flex: 1
    }
})