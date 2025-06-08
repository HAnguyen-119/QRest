import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native"

export const createOrderListStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: isDark ? COLORS.dark : COLORS.light,
        },
        toolbar: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20
        },
        title: {
            fontSize: 24,
            marginBottom: 16,
        },
        listContainer: {
            gap: 12,
        },
        orderItem: {
            padding: 20,
            borderRadius: 16,
            borderWidth: 2,
            backgroundColor: isDark ? COLORS.cardContainerDark : COLORS.cardContainerLight
        },
        orderHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        orderId: {
            fontSize: 24,
        },
        orderTime: {
            color: COLORS.gray,
        },
        orderDetails: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        tableId: {
            color: COLORS.text,
        },
        totalPrice: {
            color: COLORS.primary,
        },
        note: {
            color: COLORS.gray,
        },
        error: {
            color: COLORS.error,
            textAlign: 'center',
        },
        emptyText: {
            textAlign: 'center',
            color: COLORS.gray,
            fontSize: 16,
        },
        debugButton: {
            backgroundColor: COLORS.primary,
            padding: 8,
            borderRadius: 4,
            marginBottom: 16,
        },
        debugButtonText: {
            color: COLORS.white,
            textAlign: 'center',
        },
    });
}