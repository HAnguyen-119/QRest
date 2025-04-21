import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '../../constants/colors';
import axiosClient from '../../services/axiosClient';
import { Order } from '@/constants/types';

// Khai báo interface cho global
declare global {
  var __NEEDS_REFRESH__: boolean;
}

export default function PaymentSuccessScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Function to handle back to orders
  const handleBackToOrders = async () => {
    try {
      setLoading(true);
      
      // Thực hiện fetch mới để cập nhật dữ liệu trên server
      await axiosClient.get('/orders/completed/without-payment');
      
      // Đặt một global flag để trang index biết cần reload khi render
      global.__NEEDS_REFRESH__ = true;
      
      // Chuyển về trang chính
      router.replace('/cashier');
      
    } catch (error) {
      console.error('Error navigating back:', error);
      router.replace('/cashier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>Order has been paid successfully</Text>
        
        <View style={styles.qrContainer}>
          <Image
            source={{ 
              uri: `http://localhost:8080/api/v1/payments/${id}/qrcode`
            }}
            style={styles.qrCode}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.message}>
          This QR code contains information about your payment
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleBackToOrders}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Back to Orders'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 24,
    textAlign: 'center',
  },
  qrContainer: {
    width: 200,
    height: 200,
    marginBottom: 24,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  qrCode: {
    width: '100%',
    height: '100%',
  },
  message: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
});