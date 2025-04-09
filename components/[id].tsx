import {View, Text, TouchableOpacity, Image} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {data} from "@/app/admin/menu";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";

export default function MenuItemDetail({id, setId}) {
    const router = useRouter();
    // const { id } = useLocalSearchParams<{ id: string }>();
    const item = data.find(item => item.id === id);

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => setId(null)}>
                <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: item?.imageUrl}}></Image>
            </View>
            <Text style={styles.text}>{item?.name}</Text>
            <Text style={styles.text}>{item?.description}</Text>
            <Text style={styles.text}>{item?.ingredients}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Josefin-Sans",
    },

    imageContainer: {
        width: "100%",
        height: 400,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },

    button: {
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: 70,
        height: 30
    }
})