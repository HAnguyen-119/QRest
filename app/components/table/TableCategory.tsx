import { View, Text } from "react-native";
import {Picker} from "@react-native-picker/picker";
import { Key } from "react";
import {StyleSheet} from "react-native";
import {COLORS} from "@/constants/colors";

//@ts-ignore
export default function TableCategory({category, values, handlePick}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{category}</Text>
            <Picker style={styles.item}
                    itemStyle={styles.text}
                    selectedValue={values[0]}
                    onValueChange={(itemValue) => {handlePick(itemValue)}}>
                {values.map((value: string, index: Key) => (
                    <Picker.Item style={styles.text} label={value} key={index} value={value} />
                ))}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "40%",
        height: 65,
        marginBottom: 15,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: COLORS.dark,
        borderRadius: 10,
    },

    item: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderStyle: "solid",
    },

    text: {
        fontFamily: "Josefin-Sans",
    }
})
