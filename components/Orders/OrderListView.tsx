import { MenuItemProps, OrderListViewProps } from "@/constants/types";
import { getOrderPrice, getTotalPrice } from "@/utils/GetTotalPrice";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "../Icon/Icon";

import { createOrderListStyles} from "@/assets/styles/waiter/OrderList.styles";
import { BUTTONSIZE } from "@/constants/size";
import Animated from "react-native-reanimated";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/constants/colors";
import MenuItemOrders from "../menu/MenuItemOrders";
import { createGlobalStyles } from "@/assets/styles/Global.styles";

export default function OrderListView({ orderList, menuData, handleChange }: OrderListViewProps & { handleChange: (id: number, isAdd: boolean, isDelete: boolean) => void }) {
    const { isDark } = useThemeContext()
    const OrderListStyles = createOrderListStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    if (!orderList || orderList.length === 0) {
        return <Text style={[{ textAlign: 'center', marginTop: 16 }, globalStyles.text]}>No items in the order list</Text>
    }

    return (
        <View style={OrderListStyles.container}>
            <Animated.ScrollView style={OrderListStyles.scrollView}>
                {orderList.map((item) => {
                    const menuItem = menuData.find((menu: MenuItemProps) => menu.id === item.id)
                    if (!menuItem) return null
                    return (
                        <MenuItemOrders key={item.id} data={menuItem} quantity={item.quantity} handleChange={handleChange}/>
                    )
                })}
            </Animated.ScrollView>
        </View>
    )
}