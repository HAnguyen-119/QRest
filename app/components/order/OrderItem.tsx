import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";


// @ts-ignore
export default function OrderItem({amount, name, orderTime, orderStatus, onClick}) {
    return (

        <TouchableOpacity onPress={onClick}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.primaryActive]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientContainer}
            >
            <View style={styles.container}>
                <Text style={{
                    textDecorationLine: orderStatus == "Completed" ?'line-through' : 'none',
                    fontFamily: "JosefinSans-Regular",
                    fontSize: 22,
                    fontWeight: '600',
                    textTransform: 'capitalize',
                }}>{amount} {name}</Text>
                <Text style={{
                    fontFamily: 'monospace',
                    fontSize: 14,
                }}>Order Time: {orderTime}</Text>
            </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        margin: 17,
    },
    gradientContainer: {
        borderRadius: 12,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8, // For Android shadow
    },
})