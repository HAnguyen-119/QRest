import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { OrderDetailProps } from '../../constants/Types/order';
import { COLORS } from '../../constants/colors';

import { convertUSDtoVND } from '@/utils/ChangeMoney';
import axiosClient from '@/services/axiosClient';
import Loading from '../Loading';
import { useThemeContext } from '@/contexts/ThemeContext';
import { createGlobalStyles } from '@/assets/styles/Global.styles';
import { createOrderDetailsStyles } from '@/assets/styles/cashier/OrderDetails.styles';

import Icon from '../Icon/Icon';
import { BUTTONSIZE } from '@/constants/size';
import closeButton from '@/assets/images/close.png'

type PaymentMethod = 'BANK_TRANSFER' | 'IN_CASH';
export default function OrderDetailScreen({ id, data, visible, isPayment, setVisible }: OrderDetailProps) {
    const [paymentVisible, setPaymentVisible] = useState<boolean>(false)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('IN_CASH');

    const { isDark } = useThemeContext()
    const styles = createOrderDetailsStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    if (!data) {
        return <Loading />
    }
    const router = useRouter();

    const selectedOrder = data.find((order) => order.id === id)
    if (!selectedOrder) {
        return null
    }

    const handleBackToOrders = async () => {
        setVisible(false);
        setPaymentVisible(false);
        try {
            router.replace('/cashier/dashboard');

        } catch (error) {
            console.error('Error navigating back:', error);
        }
    };

    const handleConfirmPayment = async () => {
        if (!selectedOrder) {
            return;
        }

        try {
            const response = await axiosClient.post('/payments', {
                orderId: selectedOrder.id,
                paymentMethod: paymentMethod
            });
            if (response) {
                setPaymentVisible(true)
            }
        } catch (err) {
            console.error('Payment error:', err);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
            <View style={[styles.container, globalStyles.background]}>
                <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                    <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null} />
                </TouchableOpacity>
                <ScrollView>
                    <View style={[styles.section]}>
                        <Text style={[styles.sectionTitle, globalStyles.textBold]}>Order Information</Text>
                        <View style={[styles.infoRow]}>
                            <Text style={[styles.label, globalStyles.font]}>Order ID:</Text>
                            <Text style={[styles.value, globalStyles.font]}>#{selectedOrder.id}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.label, globalStyles.font]}>Table:</Text>
                            <Text style={[styles.value, globalStyles.font]}>{selectedOrder.tableOrders.map(it => it.restaurantTable.name)}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.label, globalStyles.font]}>Order Time:</Text>
                            <Text style={[styles.value, globalStyles.font]}>{selectedOrder.orderTime.toString()}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.label, globalStyles.font]}>Status:</Text>
                            <Text style={[styles.value, styles.status, globalStyles.font]}>{selectedOrder.orderStatus}</Text>
                        </View>
                        {selectedOrder.note && (
                            <View style={styles.infoRow}>
                                <Text style={[styles.label, globalStyles.font]}>Note:</Text>
                                <Text style={[styles.value, globalStyles.font]}>{selectedOrder.note}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Food Items</Text>
                        {selectedOrder.foodOrders.map((foodOrder, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <View style={styles.itemHeader}>
                                    <Text style={[styles.itemName, globalStyles.font]}>{foodOrder.food.name}</Text>
                                    <Text style={[styles.itemPrice, globalStyles.font]}>${foodOrder.price}</Text>
                                </View>
                                <Text style={[styles.itemQuantity, globalStyles.font]}>Quantity: {foodOrder.quantity}</Text>
                            </View>
                        ))}
                    </View>
                    {selectedOrder.comboOrders.length > 0 &&
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, globalStyles.font]}>Combo Items</Text>
                            {selectedOrder.comboOrders.map((comboOrder, index) => (
                                <View key={index} style={styles.itemContainer}>
                                    <View style={styles.itemHeader}>
                                        <Text style={[styles.itemName, globalStyles.font]}>{comboOrder.combo.name}</Text>
                                        <Text style={[styles.itemPrice, globalStyles.font]}>${comboOrder.price}</Text>
                                    </View>
                                    <Text style={[styles.itemQuantity, globalStyles.font]}>Quantity: {comboOrder.quantity}</Text>
                                    <View style={styles.comboItems}>
                                        {comboOrder.combo.comboFoods.map((comboFood, foodIndex) => (
                                            <Text key={foodIndex} style={[styles.comboFoodItem, globalStyles.font]}>
                                                • {comboFood.food.name} (x{comboFood.quantity})
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    }


                    <View style={styles.totalSection}>
                        <Text style={styles.sectionTitle}>Total Amount</Text>
                        <Text style={[styles.totalPrice, globalStyles.font]}>${selectedOrder.totalPrice}</Text>
                    </View>
                    {isPayment && <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                        <View style={styles.paymentMethods}>
                            <TouchableOpacity
                                style={[
                                    styles.paymentMethod,
                                    paymentMethod === 'IN_CASH' && styles.selectedPayment
                                ]}
                                onPress={() => setPaymentMethod('IN_CASH')}
                            >
                                <Text style={[
                                    styles.paymentMethodText,
                                    paymentMethod === 'IN_CASH' && styles.selectedPaymentText
                                , globalStyles.font]}>Cash</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.paymentMethod,
                                    paymentMethod === 'BANK_TRANSFER' && styles.selectedPayment
                                ]}
                                onPress={() => setPaymentMethod('BANK_TRANSFER')}
                            >
                                <Text style={[
                                    styles.paymentMethodText,
                                    paymentMethod === 'BANK_TRANSFER' && styles.selectedPaymentText
                                , globalStyles.font]}>Bank Transfer</Text>
                            </TouchableOpacity>
                        </View>
                        {paymentMethod === 'BANK_TRANSFER' && (
                            <View style={styles.container}>
                                <Image
                                    source={{
                                        uri: `https://img.vietqr.io/image/BIDV-4506483070-print.jpg?amount=${convertUSDtoVND(selectedOrder.totalPrice)}&addInfo=donate%20di&accountName=Do%20Dinh%20Dung%20`
                                    }}
                                    style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        width: '80%',
                                        height: undefined, // tránh dùng 'auto' trong React Native, height undefined sẽ tự động co theo tỉ lệ width
                                        aspectRatio: 1,    // hoặc tùy tỉ lệ bạn muốn, ví dụ 1 cho vuông, 1.5 cho hình chữ nhật
                                        resizeMode: 'contain'
                                    }}
                                />
                            </View>
                        )}

                        <TouchableOpacity
                            style={[styles.confirmButton]}
                            onPress={handleConfirmPayment}
                        >
                            <Text style={styles.confirmButtonText}>
                                {'Confirm Payment'}
                            </Text>
                        </TouchableOpacity>
                    </View>}

                </ScrollView>
                <Modal
                    visible={paymentVisible}
                    transparent={true}
                    animationType='slide'
                    onRequestClose={() => setPaymentVisible(false)}
                >
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <Text style={styles.title}>Payment Successful!</Text>
                            <Text style={styles.subtitle}>Order has been paid successfully</Text>

                            <View style={styles.qrContainer}>
                                <Image
                                    source={{
                                        uri: `http://34.87.113.245:18080/api/v1/payments/${id}/qrcode`
                                    }}
                                    style={styles.qrCode}
                                    resizeMode="contain"
                                />
                            </View>

                            <Text style={styles.message}>
                                This QR code contains information about your payment
                            </Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleBackToOrders}
                            >
                                <Text style={styles.buttonText}>
                                    {'Back to Orders'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </Modal>

    );
}