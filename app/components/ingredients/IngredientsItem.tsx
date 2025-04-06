import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {COLORS} from "@/constants/colors"; // You'll need to install expo-linear-gradient

export default function IngredientsItem({ name, quantity }) {
    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primaryActive]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
        >
            <View style={styles.container}>
                <Text style={styles.text}>
                    {name} {quantity}
                </Text>
            </View>
        </LinearGradient>
    );
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

    text: {
        fontFamily: "JosefinSans-Regular",
        fontSize: 22,
        fontWeight: '600',
        textTransform: 'capitalize',
    }
}