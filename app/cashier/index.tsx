import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Order } from '../../constants/types';
import { COLORS } from '../../constants/colors';
import { formatDateTime } from './_format';
import OrderDetail from './_OrderDetail';
import axiosClient from '../../services/axiosClient';

// Khai báo interface cho global
declare global {
  var __NEEDS_REFRESH__: boolean;
}

interface CashierScreenState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  selectedOrder: Order | null;
  modalVisible: boolean;
}

export default class CashierScreen extends React.Component<{}, CashierScreenState> {
  state: CashierScreenState = {
    orders: [],
    loading: true,
    error: null,
    selectedOrder: null,
    modalVisible: false
  };

  componentDidMount() {
    this.fetchOrders();
  }
  
  componentDidUpdate() {
    // Kiểm tra nếu flag cần refresh được set
    if (global.__NEEDS_REFRESH__) {
      // Reset flag
      global.__NEEDS_REFRESH__ = false;
      // Fetch lại dữ liệu
      this.fetchOrders();
    }
  }

  fetchOrders = async () => {
    try {
      this.setState({ loading: true });
      const response = await axiosClient.get<Order[]>('/orders/completed/without-payment');
      console.log(response);
      
      // Nếu response là array
      if (Array.isArray(response)) {
        // Transform snake_case to camelCase for backward compatibility
        const formattedOrders = response.map((order: Order) => ({
          ...order,
          totalPrice: order.total_price,
          orderStatus: order.order_status,
          orderTime: order.order_time,
          foodOrders: order.food_orders,
          comboOrders: order.combo_orders,
          restaurantTable: order.restaurant_table
        }));
        
        this.setState({ orders: formattedOrders, loading: false, error: null });
      } else {
        this.setState({ 
          error: 'Invalid response format', 
          loading: false 
        });
      }
    } catch (error) {
      this.setState({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        loading: false 
      });
    }
  };

  handleOrderPress = (order: Order) => {
    this.setState({ selectedOrder: order, modalVisible: true });
  };

  handleCloseModal = () => {
    this.setState({ modalVisible: false, selectedOrder: null });
  };

  renderOrderItem = ({ item }: { item: Order }) => {
    // Fallback to the snake_case properties if camelCase doesn't exist
    const orderTime = item.orderTime || item.order_time || '';
    const totalPrice = item.totalPrice || item.total_price || 0;
    const tableName = item.restaurantTable?.name || item.restaurant_table?.name || 'Unknown';
    
    return (
      <TouchableOpacity 
        style={styles.orderItem}
        onPress={() => this.handleOrderPress(item)}
      >
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <Text style={styles.orderTime}>{formatDateTime(orderTime)}</Text>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.tableId}>Table: {tableName}</Text>
          <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
        </View>
        {item.note && (
          <Text style={styles.note}>Note: {item.note}</Text>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const { loading, error, orders, selectedOrder, modalVisible } = this.state;

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
          renderItem={this.renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
        <OrderDetail
          order={selectedOrder}
          visible={modalVisible}
          onClose={this.handleCloseModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
    paddingBottom: 60,
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
}); 

