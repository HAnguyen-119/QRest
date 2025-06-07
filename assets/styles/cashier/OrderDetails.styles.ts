import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createOrderDetailsStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        section: {
            padding: 16,
            marginBottom: 8,
        },
        sectionTitle: {
            fontSize: 32,
            marginBottom: 12,
            color: isDark ? COLORS.light : COLORS.dark,
            fontFamily: 'Josefin-Sans-Bold'
        },
        infoRow: {
            flexDirection: 'row',
            marginBottom: 8,
        },
        label: {
            width: 100,
        },
        value: {
            flex: 1,
        },
        status: {
        },
        itemContainer: {
            marginBottom: 12,
            padding: 12,
            borderRadius: 8,
        },
        itemHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
        },
        itemName: {
            fontSize: 16,
            fontWeight: '500',
        },
        itemPrice: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        itemQuantity: {
            color: COLORS.gray,
        },
        comboItems: {
            marginTop: 8,
            paddingLeft: 8,
        },
        comboFoodItem: {
            marginBottom: 4,
        },
        paymentMethods: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 12,
        },
        paymentMethod: {
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            width: '45%',
        },
        selectedPayment: {
            
        },
        paymentMethodText: {
            textAlign: 'center',
        },
        selectedPaymentText: {
        },
        totalSection: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            marginBottom: 8,
        },
        totalLabel: {
            fontSize: 18,
        },
        totalPrice: {
            fontSize: 24,
        },
        confirmButton: {
            padding: 16,
            borderRadius: 8,
            margin: 16,
        },
        disabledButton: {
            opacity: 0.7,
        },
        confirmButtonText: {
            textAlign: 'center',
            fontSize: 16,
        },
        card: {
            borderRadius: 12,
            padding: 24,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        subtitle: {
            fontSize: 16,
            marginBottom: 24,
            textAlign: 'center',
        },
        qrContainer: {
            width: 200,
            height: 200,
            marginBottom: 24,
            padding: 16,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
        },
        qrCode: {
            width: '100%',
            height: '100%',
        },
        message: {
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 24,
        },
        button: {
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            width: '100%',
        },
        buttonText: {
            fontSize: 16,
            textAlign: 'center',
        },
        closeButton: {
            margin: 12,
            width: 50,
            alignSelf: 'flex-end'
        },
    })
}