import { MenuItemProps, OrderListViewProps } from "@/constants/types";
import { getOrderPrice, getTotalPrice } from "@/utils/GetTotalPrice";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "../Icon/Icon";

import Note  from '@/assets/images/note.png'
import Next from '@/assets/images/next.png'
import { createOrderListStyles} from "@/assets/styles/waiter/OrderList.styles";
import { BUTTONSIZE } from "@/constants/size";
import Animated from "react-native-reanimated";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/constants/colors";
import MenuItemOrders from "../menu/MenuItemOrders";

export default function OrderListView({ orderList, menuData, handleChange }: OrderListViewProps) {
    const { isDark } = useThemeContext()
    const OrderListStyles = createOrderListStyles(isDark)
    if (!orderList || orderList.length === 0) {
        return <Text style={[{ textAlign: 'center', marginTop: 16 }, { color: isDark ? COLORS.light : COLORS.dark }]}>No items in the order list</Text>
    }

    return (
        <View style={OrderListStyles.container}>
            <TouchableOpacity>
                <Icon src={Note} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
            </TouchableOpacity>
            <Animated.ScrollView style={OrderListStyles.scrollView}>
                {orderList.map((item, index) => {
                    const menuItem = menuData.find((menu: MenuItemProps) => menu.id === item.id)
                    if (!menuItem) return null
                    return (
                        <MenuItemOrders key={item.id} data={menuItem} quantity={item.quantity} handleChange={handleChange}/>
                    )
                })}
            </Animated.ScrollView>
            <Text style={{ color: isDark ? COLORS.light : COLORS.dark }}>
                Total price: {getOrderPrice(orderList, menuData)}
            </Text>
            <TouchableOpacity>
                <Icon src={Next} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null}/>
            </TouchableOpacity>
        </View>
    )
}