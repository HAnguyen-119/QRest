import { StyleSheet } from "react-native"
import { COLORS } from "@/constants/colors"

export const createMenuItemStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 8,
            // shadowColor: COLORS.shadow,
            // shadowOffset: {
            //     width: 0,
            //     height: 8,
            // },
            // shadowOpacity: 0.44,
            // shadowRadius: 10.32,
            // elevation: 16,
            borderWidth: 2,
            margin: 12,
            height: 120,
        },

        overlay: {
            flexDirection: 'row',
            padding: 12,
            gap: 12,
        },

        imageContainer: {
            width: 88,
            height: 88
        },

        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
        },

        detailContainer: {
            width: '60%'
        },

        buttonContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        
        quantityText: {
            fontFamily: 'Josefin-Sans',
            fontSize: 16,
            fontWeight: 'bold'
        },
        
        nameText: {
            fontFamily: 'Josefin-Sans',
            fontSize: 22,
            fontWeight: 'bold'
        },

        priceText: {
            fontFamily: 'Josefin-Sans',
            fontSize: 16,
            fontWeight: 'bold',
        },

        deleteContainer: {
            margin: 12,
            justifyContent: 'center',
            alignItems: 'center', 
        },

        deleteButton: {
            marginHorizontal: 12,
        }
    })
}