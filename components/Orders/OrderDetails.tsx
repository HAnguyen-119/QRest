import React from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { OrderDetailProps, OrderProps } from '../../constants/Types/order';
import { COLORS } from '../../constants/colors';
import { useFetchByID } from '@/hooks/useFetchByID';

import Icon from '../Icon/Icon';
import closeButton from '@/assets/images/close.png'
import { BUTTONSIZE } from '@/constants/size';

export default function OrderDetailScreen({ id, data, visible, setVisible }: OrderDetailProps) {
    if (!data) {
        return null
    }

    const selectedOrder = data.find((order) => order.id === id)

    if (!selectedOrder) {
        return null
    }

    return (
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
                            {/* <Text style={styles.value}>{order.restaurantTable.name}</Text> */}
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Order Time:</Text>
                            {/* <Text style={styles.value}>{formatDateTime(order.orderTime)}</Text> */}
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

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Total</Text>
                        <Text style={styles.totalPrice}>${selectedOrder.totalPrice}</Text>
                    </View>
                </ScrollView>
            </View>
        </Modal>
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