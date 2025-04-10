import {View, Text, Image, TouchableOpacity} from "react-native";
import { StyleSheet } from "react-native"
import {COLORS} from "@/constants/colors";
import {useRouter} from "expo-router";
import Icon from "../Icon/Icon";
import AddToCart from '@/assets/images/add-to-cart.png'

// @ts-ignore
export default function MenuItem({id, imageUrl, name, price, category, description, handleDetails, handleAdd}) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: imageUrl}} style={styles.image}/>
            </View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>{price}$</Text>
                {/*<Text style={styles.text}>{description}</Text>*/}
                {/*<Text style={styles.text}>{ingredients}</Text>*/}
                {handleDetails ? 
                    <TouchableOpacity style={styles.details} onPress={() => handleDetails(id)}>
                        <Text style={styles.buttonText}>Details</Text>
                    </TouchableOpacity>    
                    :
                    <TouchableOpacity onPress={() => handleAdd(id)}>
                        <Icon src={AddToCart} width={50} height={50}/>
                    </TouchableOpacity>
                }
            </View>
            
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: COLORS.dark,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 20,
        overflow: 'hidden',
        height: 260,
        margin: 8,
    },

    name: {
        fontFamily: 'Josefin-Sans',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 48,
    },

    price: {
        fontFamily: 'Josefin-Sans',
        fontSize: 25,
    },

    text: {
        fontFamily: "Josefin-Sans",
    },

    imageContainer: {
        overflow: 'hidden',
        width: '100%',
        height: '60%',
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    details: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: COLORS.dark,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },

    buttonText: {
        fontFamily: 'Josefin-Sans',
        color: COLORS.light,
        padding: 0,
        margin: 0

    },
    priceContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 24,
    }
})

