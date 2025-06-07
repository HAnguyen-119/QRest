import {View, Text, Image, TouchableOpacity} from "react-native";
import Icon from "../Icon/Icon";
import AddToCart from '@/assets/images/add-to-cart.png'
import { useThemeContext } from "@/contexts/ThemeContext";
import { createMenuItemStyles } from "@/assets/styles/menu/MenuItem.styles";
import { ICONSIZE } from "@/constants/size";

//@ts-ignore
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
                {handleDetails ? 
                    <TouchableOpacity style={menuItemStyles.details} onPress={() => handleDetails(id)}>
                        <Text style={menuItemStyles.buttonText}>Details</Text>
                    </TouchableOpacity>    
                    :
                    <TouchableOpacity onPress={() => handleAdd(id, true, false, category)}>
                        <Icon src={AddToCart} width={ICONSIZE.width} height={ICONSIZE.height} count={null}/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
