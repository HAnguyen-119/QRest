import { createStatusPageStyles } from "@/assets/styles/waiter/Status.styles";
import CashierOrderList from "@/components/Cashier/CashierOrderList";
import OrderDetailScreen from "@/components/Orders/OrderDetails";
import { OrderProps } from "@/constants/Types/order";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import { View } from "react-native";

export default function Status() {
    const [visible, setVisible] = useState<boolean>(false)
    const [currentID, setCurrentID] = useState<number | null>(null) 

    const { isDark } = useThemeContext()
    const styles = createStatusPageStyles(isDark)

    const { data: OrderData } = useFetch('orders')
    const today = new Date('2024-04-08')
    if (!OrderData) {
        return null
    }
    const filter = (Object.values(OrderData) as OrderProps[]).filter((order: OrderProps) => {
        const orderDate = new Date(order.orderTime)
        return (
            orderDate.getDate() === today.getDate() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear()
        )
    })
    return (
        <View style={styles.container}>
            <CashierOrderList data={filter} setCurrentID={setCurrentID} setVisible={setVisible}/>
            {currentID && <OrderDetailScreen id={currentID} data={filter} visible={visible} isPayment={false} setVisible={setVisible}/>}
        </View>
    )
}