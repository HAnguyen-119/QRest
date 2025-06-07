import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const createAdminDashboardStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: !isDark ? COLORS.light : COLORS.dark,
        },
        welcomeSection: {
            paddingVertical: 16,
            paddingHorizontal: 12,

        },
        welcomeText: {
            fontSize: 12,
        },
        title: {
            fontSize: 24,
            marginBottom: 8,
        },
        dateText: {
            fontSize: 16,
            color: COLORS.gray,
            marginBottom: 24,
        },
        cardList: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        },
        cardsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        card: {
            backgroundColor: COLORS.white,
            borderRadius: 12,
            marginBottom: 16,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            elevation: 3,
            minHeight: 150,
            justifyContent: 'center',
        },
        cardTitle: {
            fontSize: 20,
            color: COLORS.text,
            marginBottom: 12,
        },
        revenueAmount: {
            fontSize: 24,
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
        cardContainer: {
            gap: 20,
        },
        expandButton: {
            alignSelf: 'center',
            paddingBottom: 16,
        },
        statisticContainer: {
            paddingHorizontal: 16,
            paddingVertical: 24,
        }
    });
} 