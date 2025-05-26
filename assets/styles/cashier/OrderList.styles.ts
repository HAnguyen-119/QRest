import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native"

export const createOrderListStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: COLORS.background,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            color: COLORS.text,
        },
        listContainer: {
            gap: 12,
        },
        orderItem: {
            backgroundColor: COLORS.white,
            padding: 16,
            borderRadius: 8,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        orderHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        orderId: {
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.text,
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
            fontWeight: 'bold',
            color: COLORS.primary,
        },
        note: {
            color: COLORS.gray,
            fontStyle: 'italic',
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