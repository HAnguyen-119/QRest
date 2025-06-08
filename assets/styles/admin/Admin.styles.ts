import { StyleSheet } from "react-native"
import {COLORS} from "@/constants/colors";

export const createAdminStyles = ( isDark: boolean ) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
    
        menuContainer: {
            justifyContent: 'space-between',
            flex: 1,
            width: '100%',
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
        },

        toolBar: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginTop: 10,
            width: '100%',
        },
    
        menuItemsContainer: {
            marginTop: 0,
            height: '100%',
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
        },
    
        menuCategories: {
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            paddingBottom: 20,
        },
    
        menuCategory: {
            flexDirection: 'row',
            width: 132,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: isDark ? COLORS.light : COLORS.dark,
            margin: 5,
            gap: 8
        },
    
        searcher: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            width: '70%',
            borderRadius: 24,
            paddingLeft: 20,
            marginVertical: 20,
        },
    
        text: {
            fontFamily: "Josefin-Sans",
            fontSize: 16,
            color: isDark ? COLORS.light : COLORS.dark
        },

        textInput: {
            fontFamily: 'Josefin-Sans',
            paddingLeft: 12,
            height: 40,
            color: isDark ? COLORS.light : COLORS.dark,
            borderColor: isDark ? COLORS.light : COLORS.dark,
        },
    
        staffContainer: {
            flex: 1,
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
        },
    
        staffPositions: {
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            paddingBottom: 20,
        },
    
        staffPosition: {
            width: 80,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: isDark ? COLORS.light : COLORS.dark,
            margin: 5
        },
    
        staffInfoContainer: {
            height: '100%',
            marginTop: 10
        },

        updatingContainer: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            zIndex: 7,
        },

        blur: {
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.dark,
            opacity: 0.7,
            zIndex: 7,
        },

        menuUpdating: {
            position: 'absolute',
            width: '80%',
            height: '90%',
            alignSelf: 'center',
            top: "5%",
            borderRadius: 20,
            backgroundColor: "white",
            zIndex: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },

        staffUpdating: {
            position: 'absolute',
            width: '90%',
            height: '98%',
            top: "1%",
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: "white",
            zIndex: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },

        tableUpdating: {
            position: 'absolute',
            width: '80%',
            height: '40%',
            top: "30%",
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: "white",
            zIndex: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },

        accountUpdating: {
            position: 'absolute',
            width: '80%',
            alignSelf: 'center',
            marginTop: "30%",
            borderRadius: 20,
            backgroundColor: "white",
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },

        switchMode: {
            color: isDark ? COLORS.light : COLORS.dark,
        },

    })
} 
