import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 15,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        width: '90%'
    },
    bottomNav: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        color: COLORS.primaryActive
    },
    bottomFocus:{
      width: '33%'
    },
    bottom: {
      width: '17%'
    },
    buttonFocus: {
      flexDirection: 'row',
      backgroundColor: COLORS.primaryActive,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 30,
    },
    buttonCover: {
      flexDirection: 'row',
    },
    barText: {
        borderRadius: 5
    }
})
