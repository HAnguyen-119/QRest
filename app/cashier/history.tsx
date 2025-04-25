import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { OrderProps } from '../../constants/Types/order';
import { COLORS } from '../../constants/colors';
import { formatDateTime } from './_format';
import { useScrollAnimated } from '@/contexts/ScrollContext';
import Animated from 'react-native-reanimated';
import { useFetch } from '@/hooks/useFetch';
import OrderDetailScreen from '@/components/Orders/OrderDetails';
import { useThemeContext } from '@/contexts/ThemeContext';
import { createOrderListStyles } from '@/assets/styles/cashier/OrderList.styles';
import CashierOrderList from '@/components/Cashier/CashierOrderList';


export default function CashierScreen() {
    const [visible, setVisible] = useState<boolean>(false)
    const [currentID, setCurrentID] = useState<number | null>(null) 

    const { isDark } = useThemeContext()
    const styles = createOrderListStyles(isDark)

    const { data: orders } = useFetch('completed_orders')

    if (!orders) {
        return null
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Completed Orders</Text>
            <CashierOrderList data={orders} setVisible={setVisible} setCurrentID={setCurrentID}/>
            {currentID && <OrderDetailScreen id={currentID} data={orders} visible={visible} setVisible={setVisible}/>}
        </View>
    );
}