import {View, Text, Image, TouchableOpacity} from "react-native";
import { StyleSheet } from "react-native"
import {COLORS} from "@/constants/colors";
import {useRouter} from "expo-router";
import Icon from "../Icon/Icon";
import AddToCart from '@/assets/images/add-to-cart.png'
import { useThemeContext } from "@/contexts/ThemeContext";
import { createMenuItemStyles } from "@/assets/styles/menu/MenuItem.styles";

// @ts-ignore
export default function MenuItem({id, imageUrl, name, price, category, description, handleDetails, handleAdd}) {
    const { isDark } = useThemeContext()
    const menuItemStyles = createMenuItemStyles(isDark)

    return (
        <View style={menuItemStyles.container}>
            <View style={menuItemStyles.imageContainer}>
                <Image source={{uri: imageUrl}} style={menuItemStyles.image}/>
            </View>
            <Text style={menuItemStyles.name}>{name}</Text>
            <View style={menuItemStyles.priceContainer}>
                <Text style={menuItemStyles.price}>${price}</Text>
                {/*<Text style={menuItemStyles.text}>{description}</Text>*/}
                {/*<Text style={menuItemStyles.text}>{ingredients}</Text>*/}
                {handleDetails ? 
                    <TouchableOpacity style={menuItemStyles.details} onPress={() => handleDetails(id)}>
                        <Text style={menuItemStyles.buttonText}>Details</Text>
                    </TouchableOpacity>    
                    :
                    <TouchableOpacity onPress={() => handleAdd(id)}>
                        <Icon src={AddToCart} width={50} height={50} count={null}/>
                    </TouchableOpacity>
                }
            </View>
            
        </View>
    )
}
