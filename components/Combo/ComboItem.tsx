import React, { useRef } from "react"
import { View, TouchableOpacity, Text, Animated } from "react-native"
import Icon from "../Icon/Icon"
import MenuItemOrders from "../menu/MenuItemOrders"
import { MINIBUTTON } from "@/constants/size"
import dropdownButton from "@/assets/images/dropdown.png"
import minimizeButton from "@/assets/images/minimize.png"
import { ComboViewProps } from "@/constants/Types/order"
import { useThemeContext } from "@/contexts/ThemeContext"
import { createOrderListStyles } from "@/assets/styles/waiter/OrderList.styles"

export default function ComboItem({ item, menuItem, handleChange }: ComboViewProps) {
    const heightValue = useRef(new Animated.Value(0)).current 
    const [isExpanded, setIsExpanded] = React.useState(false)

    const { isDark } = useThemeContext()
    const OrderListStyles = createOrderListStyles(isDark)

    const numberOfItems = menuItem.comboFoods.length

    console.log(menuItem)

    const toggleExpand = () => {
        if (isExpanded) {
            Animated.timing(heightValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false, 
            }).start()
        } else {
            Animated.timing(heightValue, {
                toValue: numberOfItems * 136, 
                duration: 300,
                useNativeDriver: false,
            }).start()
        }
        setIsExpanded(!isExpanded)
    }

    return (
        <View style={[isExpanded ? OrderListStyles.comboContainer : {}]}>
            <MenuItemOrders data={menuItem} quantity={item.quantity} handleChange={handleChange} isComboItem={false}/>
            <TouchableOpacity onPress={toggleExpand} style={OrderListStyles.expandButton}>
                <Icon
                    src={isExpanded ? minimizeButton : dropdownButton}
                    width={MINIBUTTON.width}
                    height={MINIBUTTON.height}
                    count={null}
                />
            </TouchableOpacity>

            <Animated.View style={{ height: heightValue, overflow: "hidden" }}>
                {menuItem.comboFoods.map((item, index) => (
                    <MenuItemOrders key={index} data={item.food} quantity={item.food.quantity} handleChange={null} isComboItem={true}/>
                ))}
            </Animated.View>
        </View>
    )
}