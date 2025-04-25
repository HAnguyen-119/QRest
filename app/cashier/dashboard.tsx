import { createOrderListStyles } from "@/assets/styles/cashier/OrderList.styles";
import CashierOrderList from "@/components/Cashier/CashierOrderList";
import Searcher from "@/components/menu/Searcher";
import OrderDetailScreen from "@/components/Orders/OrderDetails";
import { OrderProps, OrderStatus, ReservationProps } from "@/constants/types";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

export default function Dashboard() {
    const [orderData, setOrderData] = useState<OrderProps[] | []>([])
    const [reservationData, setReservationData] = useState<ReservationProps[] | []>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [currentID, setCurrentID] = useState<number | null>(null)

    const { isDark } = useThemeContext()
    const styles = createOrderListStyles(isDark)

    const { data: orders } = useFetch('orders')
    const { data: reservations } = useFetch('reservations')
    if (!orders) {
        return null
    }

    const processedOrders = orders.filter((order: OrderProps) => order.orderStatus === 'PROCESSED')

    if (!processedOrders) {
        return null
    }

    const handleSearch = (value: string) => {
        setSearchValue(value)
    } 

    return (
        <View style={styles.container}>
            <Searcher onSearch={handleSearch}/>
            <Text>
                Pending Orders
            </Text>
            <CashierOrderList data={processedOrders} setVisible={setVisible} setCurrentID={setCurrentID}/>
            {currentID && <OrderDetailScreen id={currentID} data={processedOrders} visible={visible} setVisible={setVisible}/>}
        </View>
    )
}