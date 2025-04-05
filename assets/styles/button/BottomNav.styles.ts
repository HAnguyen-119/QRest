import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        width: '80%',
        alignSelf: 'center',
        bottom: 40, 
        borderRadius: 32,
        padding: 12,
        elevation: 2.7
    },
    tabItem: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        height: 36, 
        paddingHorizontal: 12,
        borderRadius: 20,

    },
    text: {
        marginLeft: 8,
    }
    
})
