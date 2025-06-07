import { createOrderListStyles } from "@/assets/styles/cashier/OrderList.styles";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { CashierOrderComponentProps, OrderProps } from "@/constants/Types/order";
import { useScrollAnimated } from "@/contexts/ScrollContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { getDate } from "@/utils/FormatTime";
import { TouchableOpacity, Text, View, RefreshControl } from "react-native";
import Animated from "react-native-reanimated";

export default function CashierOrderList({ data, setVisible, setCurrentID, refreshing, onRefresh }: CashierOrderComponentProps) {
    const { isDark } = useThemeContext()
    const styles = createOrderListStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const handleOpenOrderDetail = (id: number) => {
        setVisible(true)
        setCurrentID(id)
    }

    const { scrollHandler } = useScrollAnimated()
    

    const renderOrderItem = ({ item }: { item: OrderProps }) => {
        return (
            <TouchableOpacity
                style={[styles.orderItem, globalStyles.borderColor]}
                onPress={() => handleOpenOrderDetail(item.id)}
            >
                {item.note && (
                    <Text style={[styles.note, globalStyles.italic]}>Note: {item.note}</Text>
                )}
                <View style={styles.orderHeader}>
                    <Text style={[styles.orderId, globalStyles.textBold]}>Order #{item.id}</Text>
                    <Text style={[styles.orderTime, globalStyles.font]}>{getDate(item.orderTime)}</Text>
                </View>
                <View style={styles.orderDetails}>
                    <Text style={[globalStyles.text]}>Table: {item.tableOrders.map(it=>it.restaurantTable.name + " ")}</Text>
                    <Text style={[styles.totalPrice, globalStyles.bold]}>Total: ${Number(item.totalPrice).toFixed(2) || "0.00"}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <Animated.FlatList
            data={data}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            onScroll={scrollHandler}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    )
}