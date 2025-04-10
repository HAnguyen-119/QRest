import { BADGESIZE } from "@/constants/size";
import { StyleSheet } from "react-native";

export const IconStyles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: BADGESIZE.width,
        height: BADGESIZE.height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    }
})