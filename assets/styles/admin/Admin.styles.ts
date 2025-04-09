import { StyleSheet } from "react-native"
import {COLORS} from "@/constants/colors";

export const adminStyles = StyleSheet.create({
    container: {
        flex: 1,
    },

    menuContainer: {
        justifyContent: 'space-between',
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.light,
    },

    menuItemsContainer: {
        marginTop: 0,
        height: '100%',
        backgroundColor: COLORS.light,
    },

    menuCategories: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
    },

    menuCategory: {
        width: 80,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.dark,
        margin: 5
    },

    searcher: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.dark,
        alignSelf: 'center',
        marginVertical: 10,

    },

    text: {
        fontFamily: "Josefin-Sans",
    },

    staffContainer: {
        flex: 1,
        backgroundColor: COLORS.light,
    },

    staffPositions: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "center",
    },

    staffPosition: {
        width: 70,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.dark,
        margin: 5
    },

    staffInfoContainer: {
        width: '100%',
        alignSelf: 'center',
    },

})