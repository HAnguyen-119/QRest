import { StyleSheet } from 'react-native';
import {COLORS} from "@/constants/colors";

export const tableStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light
    },

    tableContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'wrap',
    },

    categories: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        alignItems: "center"
    },

    blur: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: COLORS.dark,
        opacity: 0.5
    }
})

