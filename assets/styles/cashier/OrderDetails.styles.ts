import { COLORS } from "@/constants/colors"
import { StyleSheet } from "react-native"

export const createOrderDetailsStyles = (isDark: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        content: {
            height: '110%'
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
            marginHorizontal: 20,
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
            marginLeft: 4,
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
            color: COLORS.priceColor
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
            backgroundColor: COLORS.priceColor
        },
        paymentMethodText: {
            textAlign: 'center',
            fontSize: 18,
        },
        selectedPaymentText: {
        },
        totalSection: {
            padding: 16,
            marginBottom: 8,
        },
        totalLabel: {
            fontSize: 18,
        },
        totalPrice: {
            fontSize: 40,
            color: COLORS.priceColor,
            textAlign: 'center'
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
            fontSize: 18,
            color: COLORS.modalSuccessText
        },
        card: {
            borderRadius: 12,
            padding: 24,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
            
        },
        title: {
            fontSize: 32,
            marginBottom: 8,
        },
        subtitle: {
            fontSize: 16,
            marginBottom: 24,
            textAlign: 'center',
        },
        qrContainer: {
            width: 300,
            height: 300,
            marginBottom: 24,
            justifyContent: 'center',
            alignItems: 'center',
        },
        qrCode: {
            width: '100%',
            height: '100%',
        },
        message: {
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 24,
            color: 'gray'
        },
        button: {
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            width: '100%',
        },
        buttonText: {
            fontSize: 24,
            textAlign: 'center',
            color: COLORS.modalSuccessText
        },
        closeButton: {
            margin: 12,
            width: 50,
            alignSelf: 'flex-end'
        },
        verticalLine: {
            borderBottomWidth: 2,
            marginHorizontal: 12,
        },
        paymentContent: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%'
        }
    })
}