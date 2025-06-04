import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { OrderDetailProps, OrderProps } from '../../constants/Types/order';
import { COLORS } from '../../constants/colors';
import { usePostByData } from '../../hooks/usePostByData';

import Icon from '../Icon/Icon';
import closeButton from '@/assets/images/close.png'
import { BUTTONSIZE } from '@/constants/size';
import OrderListView from './OrderListView';
import nextButton from '@/assets/images/next.png'
import { convertUSDtoVND } from '@/utils/ChangeMoney';
import { getDate, getTime } from '@/utils/FormatTime';
import { fetchAPI } from '@/services/fetchAPI';
import axiosClient from '@/services/axiosClient';

type PaymentMethod = 'BANK_TRANSFER' | 'IN_CASH';
export default function OrderDetailScreen({ id, data, visible, isPayment, setVisible }: OrderDetailProps) {
    const [paymentVisible, setPaymentVisible] = useState<boolean>(false)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('IN_CASH');
    if (!data) {
        return null
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
            // Chuyển về trang chính
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

    const foodOrders = selectedOrder.foodOrders
    const comboOrders = selectedOrder.comboOrders
    const menuData = foodOrders.map((food) => (food.food))
    const comboData = comboOrders.map((combo) => combo.combo)

    const foodList = foodOrders.map((food) => ({
        id: food.food.id,
        quantity: food.quantity,
    }))

    const comboList = comboOrders.map((combo) => ({
        id: combo.combo.id,
        quantity: combo.quantity
    }))

    return (
        <View>
            <Modal
                visible={visible}
                animationType='slide'
                transparent={true}
                onRequestClose={() => setVisible(false)}
            >
                <ScrollView style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Order Information</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Order ID:</Text>
                            <Text style={styles.value}>#{selectedOrder.id}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Table:</Text>
                            <Text style={styles.value}>{selectedOrder.tableOrders.map(it => it.restaurantTable.name)}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Order Time:</Text>
                            <Text style={styles.value}>{selectedOrder.orderTime.toString()}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={[styles.value, styles.status]}>{selectedOrder.orderStatus}</Text>
                        </View>
                        {selectedOrder.note && (
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Note:</Text>
                                <Text style={styles.value}>{selectedOrder.note}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Food Items</Text>
                        {selectedOrder.foodOrders.map((foodOrder, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemName}>{foodOrder.food.name}</Text>
                                    <Text style={styles.itemPrice}>${foodOrder.price}</Text>
                                </View>
                                <Text style={styles.itemQuantity}>Quantity: {foodOrder.quantity}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Combo Items</Text>
                        {selectedOrder.comboOrders.map((comboOrder, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemName}>{comboOrder.combo.name}</Text>
                                    <Text style={styles.itemPrice}>${comboOrder.price}</Text>
                                </View>
                                <Text style={styles.itemQuantity}>Quantity: {comboOrder.quantity}</Text>
                                <View style={styles.comboItems}>
                                    {comboOrder.combo.comboFoods.map((comboFood, foodIndex) => (
                                        <Text key={foodIndex} style={styles.comboFoodItem}>
                                            • {comboFood.food.name} (x{comboFood.quantity})
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.totalSection}>
                        <Text style={styles.sectionTitle}>Total Amount</Text>
                        <Text style={styles.totalPrice}>${selectedOrder.totalPrice}</Text>
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
                                ]}>Cash</Text>
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
                                ]}>Bank Transfer</Text>
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
            </Modal>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    section: {
        padding: 16,
        backgroundColor: COLORS.white,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: COLORS.text,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        width: 100,
        color: COLORS.gray,
    },
    value: {
        flex: 1,
        color: COLORS.text,
    },
    status: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    itemContainer: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: COLORS.background,
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
        color: COLORS.text,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    itemQuantity: {
        color: COLORS.gray,
    },
    comboItems: {
        marginTop: 8,
        paddingLeft: 8,
    },
    comboFoodItem: {
        color: COLORS.gray,
        marginBottom: 4,
    },
    paymentMethods: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
    },
    paymentMethod: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.primary,
        width: '45%',
    },
    selectedPayment: {
        backgroundColor: COLORS.primary,
    },
    paymentMethodText: {
        textAlign: 'center',
        color: COLORS.primary,
        fontWeight: '500',
    },
    selectedPaymentText: {
        color: COLORS.white,
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.white,
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 8,
        margin: 16,
    },
    disabledButton: {
        opacity: 0.7,
    },
    confirmButtonText: {
        color: COLORS.white,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: COLORS.white,
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
        color: COLORS.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.gray,
        marginBottom: 24,
        textAlign: 'center',
    },
    qrContainer: {
        width: 200,
        height: 200,
        marginBottom: 24,
        padding: 16,
        backgroundColor: COLORS.white,
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
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: '100%',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    }
}); 