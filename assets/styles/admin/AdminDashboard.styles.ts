import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const createAdminDashboardStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: COLORS.background,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.text,
            marginBottom: 8,
        },
        dateText: {
            fontSize: 16,
            color: COLORS.gray,
            marginBottom: 24,
        },
        cardsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        card: {
            width: '48%',
            backgroundColor: COLORS.white,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            elevation: 3,
            minHeight: 150,
            justifyContent: 'center',
        },
        cardTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: 12,
        },
        revenueAmount: {
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.primary,
            marginBottom: 8,
        },
        periodText: {
            fontSize: 12,
            color: COLORS.gray,
            marginBottom: 4,
        },
        errorText: {
            color: COLORS.error,
            fontSize: 12,
        },
        refreshButton: {
            backgroundColor: COLORS.primary,
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 16,
        },
        refreshButtonText: {
            color: COLORS.white,
            fontSize: 16,
            fontWeight: '600',
        },
    });
} 