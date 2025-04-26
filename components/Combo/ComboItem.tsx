import React from "react"
import { View, TouchableOpacity } from "react-native"
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from "react-native-reanimated"
import Icon from "../Icon/Icon"
import MenuItemOrders from "../menu/MenuItemOrders"
import { MINIBUTTON } from "@/constants/size"
import dropdownButton from "@/assets/images/dropdown.png"
import minimizeButton from "@/assets/images/minimize.png"
import { ComboViewProps } from "@/constants/Types/order"
import { useThemeContext } from "@/contexts/ThemeContext"
import { createOrderListStyles } from "@/assets/styles/waiter/OrderList.styles"

export default function ComboItem({ item, menuItem, handleChange }: ComboViewProps) {
    const heightValue = useSharedValue(0)
    const [isExpanded, setIsExpanded] = React.useState(false)

    const { isDark } = useThemeContext()
    const OrderListStyles = createOrderListStyles(isDark)

    const animatedStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
        overflow: "hidden",
    }))

    const numberOfItems = menuItem.comboFoods.length

    const toggleExpand = () => {
        if (isExpanded) {
            heightValue.value = withTiming(0, { duration: 300 })
        } else {
            heightValue.value = withTiming(numberOfItems * 136, { duration: 300 })
        }
        setIsExpanded(!isExpanded)
    }

    return (
        <View style={isExpanded ? OrderListStyles.comboContainer : null}>
            <MenuItemOrders data={menuItem} quantity={item.quantity} handleChange={handleChange} />
            <TouchableOpacity onPress={toggleExpand} style={OrderListStyles.expandButton}>
                <Icon
                    src={isExpanded ? minimizeButton : dropdownButton}
                    width={MINIBUTTON.width}
                    height={MINIBUTTON.height}
                    count={null}
                />
            </TouchableOpacity>
            <Animated.View style={[animatedStyle]}>
                {menuItem.comboFoods.map((item, index) => (
                    <MenuItemOrders key={index} data={item.food} quantity={item.food.quantity} handleChange={null} />
                ))}
            </Animated.View>
        </View>
    )
}