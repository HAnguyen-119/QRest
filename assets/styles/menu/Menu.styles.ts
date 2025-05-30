import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";

export const createMenuStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 4,
        },
    
        text: {
            fontFamily: "Josefin-Sans",
            color: "white"
        },
    
        imageContainer: {
            width: 350,
            height: 350,
            overflow: "hidden",
            alignSelf: "center",
            borderRadius: "100%"
        },
    
        image: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },
    
        backButton: {
            marginLeft: 20,
            marginTop: 20,
            backgroundColor: COLORS.secondary,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            width: 70,
            height: 30
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
            width: "85%",
            height: 50,
            marginVertical: 10,
            borderRadius: 20,
            backgroundColor: COLORS.buttonActive,
        },
    
        name: {
            color: COLORS.light,
            fontSize: 25
        },
    
        detailsContainer: {
            flex: 1,
            backgroundColor: "transparent",
            width: "85%",
            marginBottom: 10,
            borderRadius: 20,
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: COLORS.dark,
            overflow: "hidden",
            padding: 10,
            alignSelf: "center"
        }
    })
} 
