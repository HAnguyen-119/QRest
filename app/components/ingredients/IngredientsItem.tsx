import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {COLORS} from "@/constants/colors"; // You'll need to install expo-linear-gradient
import Icon from 'react-native-vector-icons/FontAwesome';
export default function IngredientsItem({ name, quantity }) {
    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primaryActive]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
        >
            <View style={styles.innerContainer}>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {name}
                    </Text>

                    <Text style={{
                        fontFamily: 'monospace',
                        fontSize: 14,
                    }}>Amount left: {quantity}</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <View style={{marginRight: 15}}>
                            <Icon name="plus" size={25} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
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
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8, // For Android shadow
    },

    text: {
        fontFamily: "JosefinSans-Regular",
        fontSize: 22,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})