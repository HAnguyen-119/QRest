import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import OrderItem from "@/components/OrdersChef/OrderItem"; // if using Expo, or use any custom checkbox
import { useFetch } from "@/hooks/useFetch";
import { OrderStatus } from "@/constants/orderstatus";
import Searcher from "@/components/menu/Searcher";
import Animated from 'react-native-reanimated';
import { useScrollAnimated } from "@/contexts/ScrollContext";

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState<string>("")
  const { data, loading, refetch } = useFetch("orders");

  // Filter pending orders
  const pendingOrders = data?.filter(
    (order: any) => (order.orderStatus === "PENDING" || order.orderStatus === "PROCESSING")
     && order.tableOrders?.map((item, index) => item.restaurantTable.name.toLowerCase()).join(", ").includes(search.toLowerCase())
  );

  const { scrollHandler, onClick } = useScrollAnimated();
  const handleSearch = (search: string) => {
    setSearch(search)
  };

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();  // Call refetch to trigger a re-fetch of data
    } catch (error) {
      console.error("❌ Failed to refresh orders:", error);
    }
    setRefreshing(false);
  };

if (pendingOrders) {
  pendingOrders.forEach((task, index) => {
    console.log(`🔍 Pending Order ${index}:`, task);
  });
}


  return (
    <Animated.ScrollView contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } 
      onScroll={scrollHandler}
    >
      <Searcher onSearch={handleSearch}/>
      {pendingOrders?.map((task, index) => 
        <OrderItem
          key={index}
          tableOrders={task.tableOrders}
          orderID={task.id}
          orderTime={task.orderTime}
          orderNotes={task.note}
          foodOrders={task.foodOrders}
          comboOrders={task.comboOrders}
          orderStatus={task.orderStatus}
          amount={task.amount}
        />
      )}
    </Animated.ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  task: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtext: {
    fontSize: 14,
    color: "#555",
  },
  done: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
