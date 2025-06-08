import { StyleSheet } from "react-native"
import { COLORS } from "@/constants/colors"

export const createMenuItemStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
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
            fontSize: 20,
        },
        
        nameText: {
            fontSize: 28,
        },

        priceText: {
            fontSize: 22,
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