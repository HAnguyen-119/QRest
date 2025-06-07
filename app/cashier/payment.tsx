import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFetch } from '@/hooks/useFetch';
import OrderDetailScreen from '@/components/Orders/OrderDetails';
import { useThemeContext } from '@/contexts/ThemeContext';
import { createOrderListStyles } from '@/assets/styles/cashier/OrderList.styles';
import CashierOrderList from '@/components/Cashier/CashierOrderList';
import { useFocusEffect } from '@react-navigation/native';
import { OrderProps } from '@/constants/Types/order';
import { createGlobalStyles } from '@/assets/styles/Global.styles';

export default function CashierScreen() {
    const [visible, setVisible] = useState<boolean>(false)
    const [currentID, setCurrentID] = useState<number | null>(null)
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const { isDark } = useThemeContext()
    const styles = createOrderListStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const { data: orders, refetch: orderRefresh } = useFetch('completed_orders')
    if (!orders) {
        return null;
    }
    const filteredData = orders.filter((order: OrderProps) => {
        const today = new Date()
        const orderDate = new Date(order.orderTime)
        return (
            today.getDay() === orderDate.getDay() &&
            today.getMonth() === orderDate.getMonth() &&
            today.getFullYear() === orderDate.getFullYear()
        )
    })

    const onRefresh = () => {
        setRefreshing(true)
        orderRefresh()
        setRefreshing(false)
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, globalStyles.textBold]}>Completed Orders</Text>
            <CashierOrderList 
                data={filteredData} 
                setVisible={setVisible} 
                setCurrentID={setCurrentID} 
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            {currentID && (
                <OrderDetailScreen 
                    id={currentID} 
                    data={filteredData} 
                    visible={visible} 
                    isPayment={true} 
                    setVisible={setVisible} 
                />
            )}
        </View>
    );
}
