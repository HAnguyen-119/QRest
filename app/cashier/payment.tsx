import React, { useState } from 'react';
import { View, Text } from 'react-native';
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

    const { data: orders } = useFetch('pending_orders')
    console.log(orders)
    if (!orders) {
        return null
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Completed Orders</Text>
            <CashierOrderList data={orders} setVisible={setVisible} setCurrentID={setCurrentID}/>
            {currentID && <OrderDetailScreen id={currentID} data={orders} visible={visible} isPayment={true} setVisible={setVisible}/>}
        </View>
    );
}