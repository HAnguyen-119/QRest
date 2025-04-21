
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { useState } from "react";

export default function OrderItem({ orderID, foodOrders, comboOrders, orderTime, orderStatus, onClick }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={() => {
        setExpanded(expanded => !expanded)
      }}
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.orderID}>
          Order ID: {orderID}
        </Text>

        {expanded && (
          <View style={styles.orderDetails}>
            {foodOrders?.map((item, index) => (
              <Text key={index} style={styles.orderItem}>
                • {item.food.name} x{item.quantity}
              </Text>
            ))}

            {comboOrders?.map((foods, index) => (
              foods?.length > 0 && foods.map((item, findex) => (
                <Text key={`combo-${index}-${findex}`} style={styles.orderItem}>
                  • {item.food.name} x{item.quantity}
                </Text>
              ))
            ))}
          </View>
        )}

        <Text style={styles.orderTime}>
          Order Time: {orderTime}
        </Text>
      </View>
      {expanded && <TouchableOpacity style={{ position: "absolute", right: 10, bottom: 10 }}><Text>Complete Order</Text></TouchableOpacity>}

      <Text style={styles.toggleText}>
        {expanded ? 'Hide Orders ▲' : 'Show Orders ▼'}
      </Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    margin: 8,
    padding: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    position: 'relative',
  },
  content: {
    paddingBottom: 10,
  },
  orderID: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  orderDetails: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark,
    paddingLeft: 15,
  },
  orderItem: {
    fontFamily: 'monospace',
    fontSize: 13,
    marginBottom: 5,
  },
  orderTime: {
    fontFamily: 'monospace',
    fontSize: 14,
    marginTop: 10,
  },
  toggleText: {
    fontFamily: 'monospace',
    fontSize: 12,
    position: "absolute",
    right: 10,
    top: 10,
    color: COLORS.dark,  // You can choose a more visually appealing color for the toggle
    paddingVertical: 4,
  },
});
