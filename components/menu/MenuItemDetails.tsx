import {View, Text, TouchableOpacity, Image} from "react-native";
import {menuStyles} from "@/assets/styles/menu/Menu.styles";
import Animated from "react-native-reanimated";

// @ts-ignore
export default function MenuItemDetails({data, id, handleBack, containerStyle}) {

    const item = data.find((item: { id: string; }) => item.id === id);

    return (
        <Animated.View style={containerStyle}>
            <TouchableOpacity style={menuStyles.button} onPress={handleBack}>
                <Text style={menuStyles.text}>Back</Text>
            </TouchableOpacity>
            <View style={menuStyles.imageContainer}>
                <Image style={menuStyles.image} source={{uri: item?.imageUrl}}></Image>
            </View>
            <Text style={menuStyles.text}>{item?.name}</Text>
            <Text style={menuStyles.text}>{item?.description}</Text>
            <Text style={menuStyles.text}>{item?.ingredients}</Text>
            <TouchableOpacity style={menuStyles.button} onPress={() => {}}>
                <Text style={menuStyles.text}>Edit</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

