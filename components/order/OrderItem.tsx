import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/colors";

// @ts-ignore
export default function OrderItem({ foodOrders, comboOrders, orderTime, orderStatus, onClick }) {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <Text style={{
          textDecorationLine: orderStatus === "Completed" ? 'line-through' : 'none',
          fontFamily: "JosefinSans-Regular",
          fontSize: 22,
          fontWeight: '600',
          textTransform: 'capitalize',
        }}>
          {JSON.stringify(foodOrders)}, {JSON.stringify(comboOrders)}, {orderStatus}
        </Text>
        <Text style={{
          fontFamily: 'monospace',
          fontSize: 14,
        }}>
          Order Time: {orderTime}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary, // Solid color background instead
    borderRadius: 12,
    margin: 8,
    padding: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // Android shadow
  },
});


