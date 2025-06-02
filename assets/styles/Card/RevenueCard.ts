import { COLORS } from "@/constants/colors";
import { RevenueType } from "@/constants/Types/revenue";
import { StyleSheet } from "react-native";

export const createRevenueCardStyles = (isDark: boolean) => {
    return StyleSheet.create({
        card: {
            backgroundColor: isDark ? COLORS.cardContainerDark : COLORS.cardContainerLight,
            borderRadius: 12,
            padding: 16,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            elevation: 3,
        },
        topRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        amount: {
            fontSize: 20,
            color: isDark ? COLORS.white : COLORS.dark,
        },
        label: {
            fontSize: 12,
            color: '#888',
            marginTop: 2,
        },
    })
}
