import { StyleSheet } from "react-native"
import {COLORS} from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    menuContainer: {
        justifyContent: 'space-between',
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.light,
    },

    menuItemsContainer: {
        backgroundColor: COLORS.light,

    },

    menuCategories: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "center",
    },

    menuCategory: {
        width: 70,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.dark,
        margin: 5
    },

    menuSearcher: {
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

})