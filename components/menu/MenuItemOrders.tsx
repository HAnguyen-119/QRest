import { MenuItemOrderProps } from "@/constants/types";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import addButton from '@/assets/images/add.png'
import decreaseButton from '@/assets/images/minus.png'
import Icon from "../Icon/Icon";
import { MINIBUTTON } from "@/constants/size";
import { createMenuItemStyles } from "@/assets/styles/menu/MenuItemOrders.styles";

export default function MenuItemOrders( { data, quantity, handleChange }: MenuItemOrderProps ) {
    const { isDark } = useThemeContext()
    const menuItemOrderStyles = createMenuItemStyles(isDark)

    return (
        <View style={menuItemOrderStyles.container}>
            <View style={menuItemOrderStyles.overlay}>
                <View style={menuItemOrderStyles.imageContainer}>
                    <Image source={{uri: data.imageUrl}} style={menuItemOrderStyles.image}/>
                </View>
                <View style={menuItemOrderStyles.detailContainer}>
                    <Text style={menuItemOrderStyles.nameText}>
                        {data.name}
                    </Text>
                    <Text>
                        {data.description}
                    </Text>
                    <Text style={menuItemOrderStyles.priceText}>
                        ${data.price * quantity}
                    </Text>
                </View>
                <View style={menuItemOrderStyles.buttonContainer}>
                    <TouchableOpacity onPress={() => handleChange(data.id, true)}>
                        <Icon src={addButton} width={MINIBUTTON.width} height={MINIBUTTON.height} count={null}/>
                    </TouchableOpacity>
                    <Text style={menuItemOrderStyles.quantityText}>x{quantity}</Text>
                    <TouchableOpacity onPress={() => handleChange(data.id, false)} disabled={quantity <= 1}>
                        <Icon src={decreaseButton} width={MINIBUTTON.width} height={MINIBUTTON.height} count={null}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}