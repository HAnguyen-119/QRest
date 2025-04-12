import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createMenuItemStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderColor: isDark ? COLORS.light : COLORS.dark,
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 20,
            overflow: 'hidden',
            height: 260,
            margin: 8,
        },

        name: {
            fontFamily: 'Josefin-Sans',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 48,
            color: isDark ? COLORS.light : COLORS.dark
        },

        price: {
            fontFamily: 'Josefin-Sans',
            fontSize: 25,
            color: isDark ? COLORS.light : COLORS.dark
        },

        text: {
            fontFamily: "Josefin-Sans",
            color: isDark ? COLORS.light : COLORS.dark
        },

        imageContainer: {
            overflow: 'hidden',
            width: '100%',
            height: '60%',
        },

        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },

        details: {
            flex: 1,
            borderRadius: 10,
            backgroundColor: isDark ? COLORS.light : COLORS.dark,
            alignItems: 'center',
            justifyContent: 'center',
            height: 40
        },

        buttonText: {
            fontFamily: 'Josefin-Sans',
            padding: 0,
            margin: 0,
            color: isDark ? COLORS.dark : COLORS.light

        },
        priceContainer: {
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 16,
            gap: 24,
            color: isDark ? COLORS.light : COLORS.dark
        }
    })
}

