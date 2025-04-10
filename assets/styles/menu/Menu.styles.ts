import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";

export const createMenuStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
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
            resizeMode: "contain",
        },
    
        button: {
            backgroundColor: COLORS.secondary,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            width: 70,
            height: 30
        }
    })
} 