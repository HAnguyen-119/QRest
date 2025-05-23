import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { OrderDetailProps, OrderProps } from '../../constants/Types/order';
import { COLORS } from '../../constants/colors';
import { useFetchByID } from '@/hooks/useFetchByID';

import Icon from '../Icon/Icon';
import closeButton from '@/assets/images/close.png'
import { BUTTONSIZE } from '@/constants/size';
import OrderListView from './OrderListView';
import nextButton from '@/assets/images/next.png'
import { convertUSDtoVND } from '@/utils/ChangeMoney';
import { getDate, getTime } from '@/utils/FormatTime';

export default function OrderDetailScreen({ id, data, visible, isPayment, setVisible }: OrderDetailProps) {
    const [paymentVisible, setPaymentVisible] = useState<boolean>(false)

    if (!data) {
        return null
    }

    const selectedOrder = data.find((order) => order.id === id)

    if (!selectedOrder) {
        return null
    }

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
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Order Information</Text>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Order ID:</Text>
                                <Text style={styles.value}>#{selectedOrder.id}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Table:</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Order Date:</Text>
                                <Text style={styles.value}>{getDate(selectedOrder.orderTime)}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Order Time:</Text>
                                <Text style={styles.value}>{getTime(selectedOrder.orderTime)}</Text>
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

                        <OrderListView 
                            orderList={foodList} 
                            comboList={comboList} 
                            menuData={menuData} 
                            combosData={comboData} 
                            handleChange={null} 
                        />

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Total</Text>
                            <Text style={styles.totalPrice}>${selectedOrder.totalPrice}</Text>
                            {isPayment && <TouchableOpacity onPress={() => setPaymentVisible(true)}>
                                <Icon src={nextButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={0}/>
                            </TouchableOpacity>}
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <Modal
                visible={paymentVisible}
                transparent={true}
                animationType='slide'
                onRequestClose={() => setPaymentVisible(false)}
            >   
                <View style={styles.container}>
                    <Image source={{ uri: `https://img.vietqr.io/image/BIDV-4506483070-print.jpg?amount=${convertUSDtoVND(selectedOrder.totalPrice)}&addInfo=donate%20di&accountName=Do%20Dinh%20Dung%20` }} style={{ flex: 1, alignSelf: 'center', width: '80%', height: 'auto', resizeMode: 'contain' }} />
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
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        textAlign: 'right',
    },
    error: {
        color: COLORS.error,
        textAlign: 'center',
        marginTop: 20,
    },
}); 