import { StyleSheet } from "react-native"

export const createReservationViewStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        text: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        input: {
            borderWidth: 1,
        },
        modalBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)'
        },
        modalView: {
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 24,
            minWidth: 220,
            alignItems: 'center'
        },
        modalSuccessText: {
            fontSize: 18,
            color: '#4BB543',
            marginBottom: 12
        },
        modalFailureText:
        {
            fontSize: 18,
            color: '#D94343',
            marginBottom: 12
        },

        closeButton: { 
            color: "#007AFF", 
        }



    })
}