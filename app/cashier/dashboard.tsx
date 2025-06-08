import { createOrderListStyles } from "@/assets/styles/cashier/OrderList.styles";
import CashierOrderList from "@/components/Cashier/CashierOrderList";
import Searcher from "@/components/menu/Searcher";
import OrderDetailScreen from "@/components/Orders/OrderDetails";
import { ReservationProps } from "@/constants/Types/reservation";
import { OrderStatus, OrderProps } from "@/constants/Types/order";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import Animated from "react-native-reanimated";
import Loading from "@/components/Loading";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { SearchOrder } from "@/utils/SearchOrder";
import Alert from '@/assets/images/alert.png'
import Icon from "@/components/Icon/Icon";
import { BUTTONSIZE } from "@/constants/size";
import ModalCreateNotification from "@/components/Modal/ModalCreateNotification";

export default function Dashboard() {
    const [searchValue, setSearchValue] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [currentID, setCurrentID] = useState<number | null>(null)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [reportModalVisible, setReportModalVisible] = useState<boolean>(false)

    const { isDark } = useThemeContext()
    const styles = createOrderListStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const { data: orders, refetch: orderRefresh } = useFetch('pending_orders')

    if (!orders) {
        return <Loading />
    }

    const processedOrders = (Object.values(orders) as OrderProps[]).filter((order: OrderProps) => {
        const today = new Date()
        const orderDate = new Date(order.orderTime)
        return (orderDate.getDay() === today.getDay() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear() &&
            SearchOrder({ tables: order.tableOrders, searchValue: searchValue })
        )
    })
    if (!processedOrders) {
        return <Loading />
    }

    const handleSearch = (value: string) => {
        setSearchValue(value)
    }

    const onRefresh = () => {
        setRefreshing(true)
        orderRefresh()
        setRefreshing(false)
    }

    const refresh = () => {
        orderRefresh()
    }

    return (
        <>
            <View
                style={styles.container}
            >
                <View style={styles.toolbar}>
                    <Searcher onSearch={handleSearch} />
                    <TouchableOpacity onPress={() => setReportModalVisible(true)}>
                        <Icon src={Alert} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null} />
                    </TouchableOpacity>
                </View>
                <Text style={[{ fontSize: 24, marginBottom: 24 }, globalStyles.textBold]}>
                    Have a good day, cashier!
                </Text>

                {processedOrders.length == 0 &&
                    <Text style={[globalStyles.text]}>Oops, there's no orders that are pending now!</Text>
                }

                <CashierOrderList
                    data={processedOrders}
                    setVisible={setVisible}
                    setCurrentID={setCurrentID}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                {currentID &&
                    <OrderDetailScreen
                        id={currentID}
                        data={processedOrders}
                        visible={visible}
                        isPayment={true}
                        setVisible={setVisible}
                        refresh={refresh}
                    />}
            </View>
            <ModalCreateNotification
                visible={reportModalVisible}
                onClose={() => setReportModalVisible(false)}
                onSubmit={() =>
                    setReportModalVisible(false)
                }
            />
        </>
    )
}