import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useFetch } from './_useFetchCashier';
import { Order } from '../../constants/types';
import { COLORS } from '../../constants/colors';
import { formatDateTime } from './_format';


export default function CashierScreen() {
  const router = useRouter();
  const { data: orders, loading, error } = useFetch<Order[]>('/orders/completed/without-payment');

  const renderOrderItem = ({ item }: { item: Order }) => {
    console.log("debugg");
    console.log(item.orderTime);
    console.log(item.restaurantTable.name);
    console.log(item.totalPrice);
    return (
      <TouchableOpacity 
        style={styles.orderItem}
        onPress={() => router.push(`/cashier/${item.id}` as any)}
      >
        {item.note && (
          <Text style={styles.note}>Note: {item.note}</Text>
        )}
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <Text style={styles.orderTime}>{formatDateTime(item.orderTime)?.toString()}</Text>
        </View>
        <View style={styles.orderDetails}>
        <Text style={styles.tableId}>
          Table: {item.restaurantTable && typeof item.restaurantTable === 'object' ? item.restaurantTable.name || 'Unknown' : 'Unknown'}
        </Text>
        <Text style={styles.totalPrice}>Total: ${Number(item.totalPrice).toFixed(2) || "0.00"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No completed orders found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.text,
  },
  listContainer: {
    gap: 12,
  },
  orderItem: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  orderTime: {
    color: COLORS.gray,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tableId: {
    color: COLORS.text,
  },
  totalPrice: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  note: {
    color: COLORS.gray,
    fontStyle: 'italic',
  },
  error: {
    color: COLORS.error,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 16,
  },
  debugButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  debugButtonText: {
    color: COLORS.white,
    textAlign: 'center',
  },
}); 

