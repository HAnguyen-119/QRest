import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Order } from '../../constants/types';
import { COLORS } from '../../constants/colors';
import { formatDateTime } from './_format';
import { usePostByData } from '../../hooks/usePostByData';
import { useRouter } from 'expo-router';

type PaymentMethod = 'BANK_TRANSFER' | 'IN_CASH';

interface OrderDetailProps {
  order: Order | null;
  visible: boolean;
  onClose: () => void;
}

export default function OrderDetail({ order, visible, onClose }: OrderDetailProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('IN_CASH');
  const { post, loading, error } = usePostByData();
  const router = useRouter();

  const handleConfirmPayment = async () => {
    if (!order) {
      return;
    }
    
    try {
      console.log(order.id);
      console.log(paymentMethod);
      const response = await post('/payments', {
        orderId: order.id,
        paymentMethod: paymentMethod
      });

      if(response && response.id) {
        onClose();
        router.push(`/cashier/payment-success?id=${response.id}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  if (!order) return null;

  const orderStatus = order.orderStatus || order.order_status;
  const orderTime = order.orderTime || order.order_time;
  const totalPrice = order.totalPrice || order.total_price;
  const foodOrders = order.foodOrders || order.food_orders || [];
  const comboOrders = order.comboOrders || order.combo_orders || [];
  const restaurantTable = order.restaurantTable || order.restaurant_table;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Order #{order.id}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{orderStatus}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Order Time:</Text>
            <Text style={styles.value}>{formatDateTime(orderTime)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Table:</Text>
            <Text style={styles.value}>
              {restaurantTable?.name || ''}
            </Text>
          </View>
          {order.note && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Note:</Text>
              <Text style={styles.value}>{order.note}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Items</Text>
          {foodOrders.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.food?.name || ''}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Combo Items</Text>
          {comboOrders.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.combo?.name || ''}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              <View style={styles.comboItems}>
                {item.combo?.comboFoods?.map((comboFood, foodIndex) => (
                  <Text key={foodIndex} style={styles.comboFoodItem}>
                    • {comboFood.food?.name || ''}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'IN_CASH' && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod('IN_CASH')}
            >
              <Text style={[
                styles.paymentMethodText,
                paymentMethod === 'IN_CASH' && styles.selectedPaymentText
              ]}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'BANK_TRANSFER' && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod('BANK_TRANSFER')}
            >
              <Text style={[
                styles.paymentMethodText,
                paymentMethod === 'BANK_TRANSFER' && styles.selectedPaymentText
              ]}>Bank Transfer</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>

        {error && (
          <Text style={styles.error}>{error}</Text>
        )}

        <TouchableOpacity
          style={[styles.confirmButton, loading && styles.disabledButton]}
          onPress={handleConfirmPayment}
          disabled={loading}
        >
          <Text style={styles.confirmButtonText}>
            {loading ? 'Processing...' : 'Confirm Payment'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.gray,
  },
  section: {
    padding: 16,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.text,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: 100,
    color: COLORS.gray,
  },
  value: {
    flex: 1,
    color: COLORS.text,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemQuantity: {
    color: COLORS.gray,
  },
  comboItems: {
    marginTop: 8,
    paddingLeft: 8,
  },
  comboFoodItem: {
    color: COLORS.gray,
    marginBottom: 4,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  paymentMethod: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: '45%',
  },
  selectedPayment: {
    backgroundColor: COLORS.primary,
  },
  paymentMethodText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '500',
  },
  selectedPaymentText: {
    color: COLORS.white,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  confirmButtonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 16,
  },
}); 