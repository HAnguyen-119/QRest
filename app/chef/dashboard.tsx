import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, RefreshControl, View, TouchableOpacity } from "react-native";
import OrderItem from "@/components/OrdersChef/OrderItem"; // if using Expo, or use any custom checkbox
import { useFetch } from "@/hooks/useFetch";
import Searcher from "@/components/menu/Searcher";
import Animated from 'react-native-reanimated';
import Icon from "@/components/Icon/Icon";
import { useScrollAnimated } from "@/contexts/ScrollContext";
import { BUTTONSIZE } from "@/constants/size";
import Alert from '@/assets/images/alert.png'
import ModalCreateNotification from "@/components/Modal/ModalCreateNotification";
import { COLORS } from "@/constants/colors";
import { useThemeContext } from "@/contexts/ThemeContext";
import { createGlobalStyles } from "@/assets/styles/Global.styles";

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState<string>("")
  const { data, loading, refetch } = useFetch("orders");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [modalValue, setModalValue] = useState("");

  const { isDark } = useThemeContext()
  const globalStyles = createGlobalStyles(isDark)

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
      await refetch();
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
    <Animated.ScrollView contentContainerStyle={[styles.container, globalStyles.background]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } 
      onScroll={scrollHandler}
    >
      <View style={styles.chefToolBar}>
        <Searcher onSearch={handleSearch}/>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Icon src={Alert} width={BUTTONSIZE.width} height={BUTTONSIZE.height}/>
        </TouchableOpacity>
      </View>
      <ModalCreateNotification
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={modalValue => {
          setModalValue(modalValue);
          setIsModalVisible(false);
        }}
      />
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
  chefToolBar: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    width: '130%',
  },
  container: {
    padding: 20,
    backgroundColor: COLORS.light,
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
