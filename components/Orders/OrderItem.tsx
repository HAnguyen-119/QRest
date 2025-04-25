
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { useState } from "react";
import { COLORS } from "@/constants/colors";

// @ts-ignore
export default function OrderItem({ amount, name, orderTime, orderStatus, items = [], onClick, onComplete }) {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(prev => !prev);
    if (onClick) {
      onClick();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={{
          textDecorationLine: orderStatus === "Completed" ? 'line-through' : 'none',
          fontFamily: "JosefinSans-Regular",
          fontSize: 22,
          fontWeight: '600',
          textTransform: 'capitalize',
        }}>
          {amount} {name}
        </Text>
        <Text style={{
          fontFamily: 'monospace',
          fontSize: 14,
        }}>
          Order Time: {orderTime}
        </Text>

        {expanded && (
          <View style={styles.expandedSection}>
            <View style={styles.itemsList}>
              {items.map((item: string, index: number) => (
                <Text key={index} style={styles.itemText}>• {item}</Text>
              ))}
            </View>

            <View style={styles.confirmationBar}>
              <Button
                title="Complete Order"
                onPress={onComplete}
                color={COLORS.primaryActive}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
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
  },
  expandedSection: {
    marginTop: 10,
  },
  itemsList: {
    marginTop: 8,
    marginBottom: 12,
  },
  itemText: {
    fontFamily: 'monospace',
    fontSize: 16,
    marginBottom: 4,
  },
  confirmationBar: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
});
