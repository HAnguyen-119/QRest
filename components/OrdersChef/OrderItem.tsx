import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; import { COLORS } from "@/constants/colors";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/services/fetchAPI";
import { createOrderListStyles } from "@/assets/styles/waiter/OrderList.styles";
import { OrderStatus } from "@/constants/Types/order";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { getTime } from "@/utils/FormatTime";
import TableItemOrders from "../table/TableItemOrders";
import FoodOrderItem from "./FoodOrderItem";
export default function OrderItem({ tableOrders, orderID, foodOrders, orderNotes, comboOrders, orderTime, orderStatus, onClick }) {

  //const { isDark } = useThemeContext()
  //const OrderItemStyles = createOrderListStyles(isDark)
  const [expanded, setExpanded] = useState(false);
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    setTaken(orderStatus === "PROCESSING");
  }, [orderStatus]);
  const chefCompleteOrder = (orderID: number) => {
    // Logic to complete the order
    fetchAPI.editOrderStatus(orderID, "PROCESSED")
    console.log(`Took ${orderID}`)
  };

  const completeFoodOrder = (foodID: number) => {
    console.log(foodID)
    fetchAPI.completeFoodOrder(foodID, true);
  }
  const chefTakeOrder = (orderID: number) => {
    // Logic to take the order
    fetchAPI.editOrderStatus(orderID, "PROCESSING")
    setTaken(taken => !taken)
    console.log(`Took ${orderID}`)
  }

  return (
    <View style={takenStyles(taken).container}>
      <View style={styles.content}>
            <Text style={styles.noteText}>
              {orderNotes?.length > 0 && `Notes: ${orderNotes}`}
            </Text>
        <Text style={styles.orderHeader}>
          Order for table {tableOrders?.map((item, index) => item.restaurantTable.name).join(", ")} {orderID}
        </Text>

        {expanded && (
          <View style={styles.orderDetails}>
          {foodOrders?.map((item, index) => (
            <View key={`food-${index}`} style={styles.orderItemContainer}>
              <FoodOrderItem
                id={item.id}
                name={item.food?.name}
                quantity={item.quantity}
                completed={item.completed}
                onComplete={() => completeFoodOrder(item.id)}
              />
            </View>
          ))}
              {comboOrders?.map((foods, index) => (
              foods?.length > 0 && foods.map((item, findex) => (
                <Text key={`combo-${index}-${findex}`} style={styles.orderItem}>
                  {item.food.name} x{item.quantity}
                </Text>

              ))
            ))}

          </View>
        )}


        <Text style={[styles.orderTime, takenStyles(taken).text]}>
          Status: {taken ? "processing" : "pending" }
        </Text>
        <Text style={styles.orderTime}>
          Order Time: {getTime(orderTime)}
        </Text>
      </View>

      {expanded && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              takenStyles(taken).completeButton,
            ]}
            onPress={() => chefCompleteOrder(orderID)}
            disabled={!taken}
          >
            <Text style={styles.completeButtonText}>Complete Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              takenStyles(taken).takeButton,
            ]}
            onPress={() => chefTakeOrder(orderID)}
          >
            <Text style={styles.completeButtonText}>Take Order</Text>
          </TouchableOpacity>
        </View>
      )
      }

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setExpanded(expanded => !expanded)}
      >
        <Text style={styles.toggleText}>
          {expanded ? 'Hide Orders ▲' : 'Show Orders ▼'}
        </Text>
      </TouchableOpacity>
    </View >
  );
}

const takenStyles = (taken: boolean) => ({
  container: {
    // backgroundColor: taken ? COLORS.orderActive : COLORS.orderNotTaken,
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
  completeButton: {
    // backgroundColor: taken ? COLORS.orderActive : COLORS.orderNotTaken,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    opacity: taken ? 1 : 0.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    margin: 5,
  },

  text: {
    color: taken ? COLORS.orderActive : COLORS.orderNotTaken,
  },

  takeButton: {
    // backgroundColor: taken ? COLORS.orderActive : COLORS.orderNotTaken,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    margin: 5,
  }

});
export const styles = StyleSheet.create({
  content: {
    paddingBottom: 10,
  },
  orderHeader: {
    fontFamily: "Josefin-Sans",
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

  orderTime: {
    fontFamily: 'Josefin-Sans',
    fontSize: 14,
    marginTop: 10,
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  toggleText: {
    fontFamily: 'Josefin-Sans',
    fontSize: 13,
    color: COLORS.dark,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  completeButtonText: {
    color: COLORS.dark,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  noteText: {
    fontFamily: 'Josefin-Sans',
    fontSize: 13,
    color: '#999', 
    fontStyle: "italic",
    marginBottom: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
