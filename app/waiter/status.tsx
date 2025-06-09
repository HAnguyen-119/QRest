import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { createStatusPageStyles } from "@/assets/styles/waiter/Status.styles";
import CashierOrderList from "@/components/Cashier/CashierOrderList";
import Loading from "@/components/Loading";
import OrderDetailScreen from "@/components/Orders/OrderDetails";
import { OrderProps } from "@/constants/Types/order";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Status() {
    const [visible, setVisible] = useState<boolean>(false)
    const [currentID, setCurrentID] = useState<number | null>(null) 
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const { isDark } = useThemeContext()
    const styles = createStatusPageStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const { data: OrderData, refetch: orderRefetch } = useFetch('pending_orders')

    useEffect(() => {
        const interval = setInterval(() => {
            orderRefetch()
        }, 30000)

        return () => clearInterval(interval);
    }, [orderRefetch]);

    const today = new Date()
    if (!OrderData) {
        return <Loading/>
    }
    const filter = (Object.values(OrderData) as OrderProps[]).filter((order: OrderProps) => {
        const orderDate = new Date(order.orderTime)
        return (
            orderDate.getDate() === today.getDate() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear()
        )
    })
    const onRefresh = () => {
        setRefreshing(true)
        orderRefetch()
        setRefreshing(false)
    }
    return (
        <View style={[styles.container, globalStyles.background]}>
            <Text style={[globalStyles.textBold, styles.headerText]}>Orders Status</Text>
            <Text style={[globalStyles.italic, styles.footerText]}>Checkout what's the status of food orders here!</Text>
            <CashierOrderList data={filter} setCurrentID={setCurrentID} setVisible={setVisible} refreshing={refreshing} onRefresh={onRefresh}/>
            {currentID && <OrderDetailScreen id={currentID} data={filter} visible={visible} isPayment={false} setVisible={setVisible} refresh={onRefresh}/>}
        </View>
    )
}