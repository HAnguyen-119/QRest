import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { COLORS } from "@/constants/colors";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/services/fetchAPI";
import { createOrderListStyles } from "@/assets/styles/waiter/OrderList.styles";
import { OrderStatus } from "@/constants/Types/order";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { getTime } from "@/utils/FormatTime";
import { MaterialIcons } from "@expo/vector-icons";
import TableItemOrders from "../table/TableItemOrders";
import FoodOrderItem from "./FoodOrderItem";
import ModalConfirm from "../Modal/ModalConfirmation";
export default function OrderItem({
  tableOrders,
  orderID,
  foodOrders,
  orderNotes,
  comboOrders,
  orderTime,
  orderStatus,
  onClick,
}) {
  //const { isDark } = useThemeContext()
  //const OrderItemStyles = createOrderListStyles(isDark)
  const [expanded, setExpanded] = useState(false);
  const [taken, setTaken] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [showTakeModal, setShowTakeModal] = useState(false);


  useEffect(() => {
    setTaken(orderStatus === "PROCESSING");
  }, [orderStatus]);

  const chefCompleteOrder = (orderID: number) => {
    // Logic to complete the order
    setCompleted(true);
    fetchAPI.editOrderStatus(orderID, "PROCESSED");
  };

  const completeFoodOrder = (foodID: number) => {
    fetchAPI.completeFoodOrder(foodID, true);
  };
  const chefTakeOrder = (orderID: number) => {
    // Logic to take the order
    fetchAPI.editOrderStatus(orderID, "PROCESSING");
    console.log(`Took ${orderID}`);
    setTaken(true);
  };

  if (completed) return null;

  return (
    <View style={takenStyles(taken).container}>
      <View style={styles.content}>
        <Text style={styles.noteText}>
          {orderNotes?.length > 0 && `Notes: ${orderNotes}`}
        </Text>

        <Text style={styles.orderHeader}>
          Order for table{" "}
          {tableOrders
            ?.map((item, index) => item.restaurantTable.name)
            .join(", ")}
        </Text>
        {
          <Text style={styles.orderStatus}>
            {taken ? (
              <Text style={{ color: COLORS.orderActive, fontWeight: "bold" }}>
                Processing
              </Text>
            ) : (
              <Text style={{ color: COLORS.orderNotTaken, fontWeight: "bold" }}>
                Pending
              </Text>
            )}
          </Text>
        }
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
          </View>
        )}
      </View>
      <Text style={styles.orderTime}>
        Time:{" "}
        {`${new Date(orderTime)
          .getHours()
          .toString()
          .padStart(2, "0")}:${new Date(orderTime)
          .getMinutes()
          .toString()
          .padStart(2, "0")}`}
      </Text>
      {expanded && (
        <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[takenStyles(taken).completeButton]}
        onPress={() => setShowCompleteModal(true)}
        disabled={!taken}
      >
        <Text style={styles.completeButtonText}>Complete Order</Text>
      </TouchableOpacity>
      <ModalConfirm
        visible={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        onConfirm={() => {
          chefCompleteOrder(orderID);
          setShowCompleteModal(false);
        }}
        title="Confirm"
        message="Are you sure you want to complete this order?"
      />
    <TouchableOpacity
      style={[takenStyles(taken).takeButton]}
      onPress={() => setShowTakeModal(true)}
      disabled={taken}
    >
      <Text style={styles.completeButtonText}>Take Order</Text>
    </TouchableOpacity>
    <ModalConfirm
      visible={showTakeModal}
      onClose={() => setShowTakeModal(false)}
      onConfirm={() => {
        chefTakeOrder(orderID);
        setShowTakeModal(false);
      }}
      title="Confirm"
      message="Are you sure you want to take this order?"
    />
        </View>
      )}

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setExpanded((expanded) => !expanded)}
      >
        <Text style={styles.toggleText}>
          {expanded ? "Hide Orders ▲" : "Show Orders ▼"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const takenStyles = (taken: boolean) => ({
  container: {
    borderRadius: 12,
    margin: 8,
    padding: 17,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    position: "relative",
  },
  completeButton: {
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    opacity: taken ? 0.5 : 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    margin: 5,
  },
});
export const styles = StyleSheet.create({
  content: {
    paddingBottom: 10,
  },
  orderHeader: {
    fontFamily: "Josefin-Sans",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  orderDetails: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark,
    paddingLeft: 15,
  },

  orderTime: {
    fontFamily: "Josefin-Sans",
    fontSize: 14,
    fontWeight: "400",
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  toggleText: {
    fontFamily: "Josefin-Sans",
    fontSize: 13,
    color: COLORS.dark,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  completeButtonText: {
    color: COLORS.dark,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  noteText: {
    fontFamily: "Josefin-Sans",
    fontSize: 13,
    color: "#999",
    fontStyle: "italic",
    marginBottom: 5,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  orderStatus: {
    position: "absolute",
    right: 10,
    top: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  statusIconContainer: {
    // marginTop: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
});
