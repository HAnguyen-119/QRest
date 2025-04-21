import { ComboItemProps, MenuItemIDProps, MenuItemProps, OrderListViewProps } from "@/constants/types";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "../Icon/Icon";

import { createOrderListStyles} from "@/assets/styles/waiter/OrderList.styles";
import { BUTTONSIZE } from "@/constants/size";
import Animated from "react-native-reanimated";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/constants/colors";
import MenuItemOrders from "../menu/MenuItemOrders";
import { createGlobalStyles } from "@/assets/styles/Global.styles";

export default function OrderListView({ orderList, comboList, menuData, combosData, handleChange }: OrderListViewProps & { handleChange: (id: number, isAdd: boolean, isDelete: boolean, category: string) => void }) {
    const { isDark } = useThemeContext()
    const OrderListStyles = createOrderListStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    if (!orderList || orderList.length === 0 || !comboList || comboList.length === 0) {
        return <Text style={[{ textAlign: 'center', marginTop: 16 }, globalStyles.text]}>No items in the order list</Text>
    }

    console.log('combo2: ', comboList)
    console.log('order2: ', orderList)

    return (
        <View style={OrderListStyles.container}>
            <Animated.ScrollView style={OrderListStyles.scrollView}>
                {comboList.length > 0 && comboList?.map((item) => {
                    const menuItem = combosData.find((combo: ComboItemProps) => combo.id === item.id)
                    if (!menuItem) return null
                    return (
                        <MenuItemOrders key={item.id} data={menuItem} quantity={item.quantity} handleChange={handleChange}/>
                    )
                })}
                {orderList.length > 0 && orderList?.map((item) => {
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