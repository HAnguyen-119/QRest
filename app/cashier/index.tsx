import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { OrderProps } from '../../constants/types';
import { COLORS } from '../../constants/colors';
import { formatDateTime } from './_format';
import { useScrollAnimated } from '@/contexts/ScrollContext';
import Animated from 'react-native-reanimated';
import { useFetch } from '@/hooks/useFetch';
import OrderDetailScreen from '@/components/Orders/OrderDetails';


export default function CashierScreen() {
    const [visible, setVisible] = useState<boolean>(false)
    const [currentID, setCurrentID] = useState<number | null>(null) 

    const { data: orders } = useFetch('orders')
    const { scrollHandler } = useScrollAnimated()

    if (!orders) {
        return null
    }

    const handleOpenOrderDetail = (id: number) => {
        setVisible(true)
        setCurrentID(id)
    }

    const renderOrderItem = ({ item }: { item: OrderProps }) => {
        return (
            <TouchableOpacity
                style={styles.orderItem}
                onPress={() => handleOpenOrderDetail(item.id)}
            >
                {item.note && (
                    <Text style={styles.note}>Note: {item.note}</Text>
                )}
                <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{item.id}</Text>
                    <Text style={styles.orderTime}>{item.orderTime.toString()}</Text>
                </View>
                <View style={styles.orderDetails}>
                    <Text style={styles.totalPrice}>Total: ${Number(item.totalPrice).toFixed(2) || "0.00"}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Completed Orders</Text>
            <Animated.FlatList
                data={orders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                onScroll={scrollHandler}
            />
            {currentID && <OrderDetailScreen id={currentID} visible={visible} setVisible={setVisible}/>}
        </View>
    );
}

const styles = StyleSheet.create({
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

