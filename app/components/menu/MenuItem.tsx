import {View, Text, Image, TouchableOpacity} from "react-native";
import { StyleSheet } from "react-native"
import {COLORS} from "@/constants/colors";

// @ts-ignore
export default function MenuItem({imageUrl, name, price, description, ingredients}) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: imageUrl}} style={styles.image}/>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
            {/*<Text style={styles.text}>{description}</Text>*/}
            {/*<Text style={styles.text}>{ingredients}</Text>*/}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        borderColor: COLORS.dark,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 20,
        overflow: 'hidden',
        width: '43%',
        height: 200,
        marginLeft: 17,
        marginTop: 17
    },

    name: {
        fontFamily: 'Josefin-Sans',
        fontSize: 20,
        marginLeft: 10,
    },

    price: {
        fontFamily: 'Josefin-Sans',
        fontSize: 25,
        marginLeft: 10,
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

    button: {
        position: 'absolute',
        bottom: 12,
        right: 10,
        width: 70,
        height: 30,
        borderRadius: 10,
        backgroundColor: COLORS.dark,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontFamily: 'Josefin-Sans',
        color: COLORS.light,

    }
})

