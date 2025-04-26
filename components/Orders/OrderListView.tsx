import { ComboItemProps, OrderListViewProps } from "@/constants/Types/order";
import { MenuItemIDProps, MenuItemProps } from "@/constants/Types/menuitem";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "../Icon/Icon";

import { createOrderListStyles} from "@/assets/styles/waiter/OrderList.styles";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useThemeContext } from "@/contexts/ThemeContext";
import MenuItemOrders from "../menu/MenuItemOrders";
import { createGlobalStyles } from "@/assets/styles/Global.styles";

import ComboItem from "../Combo/ComboItem";

export default function OrderListView({ orderList, comboList, menuData, combosData, handleChange }: OrderListViewProps & { handleChange: ((id: number, isAdd: boolean, isDelete: boolean, category: string) => void) | null }) {    
    const { isDark } = useThemeContext()
    const OrderListStyles = createOrderListStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    if (orderList.length === 0 && comboList.length === 0) {
        return <Text style={[{ textAlign: 'center', marginTop: 16 }, globalStyles.text]}>No items in the order list</Text>
    }

    return (
        <View style={OrderListStyles.container}>
            <Animated.ScrollView style={OrderListStyles.scrollView} nestedScrollEnabled={true}>
                {comboList.length > 0 && comboList.map((item) => {
                    const menuItem = combosData.find((combo: ComboItemProps) => combo.id === item.id)
                    if (!menuItem) return null
                    return (
                        <ComboItem key={item.id} item={item} menuItem={menuItem} handleChange={handleChange}/>
                    )
                })}
                {orderList.length > 0 && orderList.map((item) => {
                    const menuItem = menuData.find((menu: MenuItemIDProps) => menu.id === item.id)
                    if (!menuItem) return null
                    return (
                        <MenuItemOrders key={item.id} data={menuItem} quantity={item.quantity} handleChange={handleChange}/>
                    )
                })}
            </Animated.ScrollView>
        </View>
    )
}