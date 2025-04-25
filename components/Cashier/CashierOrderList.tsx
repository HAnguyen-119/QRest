import { createOrderListStyles } from "@/assets/styles/cashier/OrderList.styles";
import { CashierOrderComponentProps, OrderProps } from "@/constants/types";
import { useScrollAnimated } from "@/contexts/ScrollContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { TouchableOpacity, Text, View } from "react-native";
import Animated from "react-native-reanimated";

export default function CashierOrderList({ data, setVisible, setCurrentID }: CashierOrderComponentProps) {
    const { isDark } = useThemeContext()
    const styles = createOrderListStyles(isDark)

    const handleOpenOrderDetail = (id: number) => {
        setVisible(true)
        setCurrentID(id)
    }

    const { scrollHandler } = useScrollAnimated()
    

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
        <Animated.FlatList
            data={data}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            onScroll={scrollHandler}
        />
    )
}