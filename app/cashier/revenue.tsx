import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import axiosClient from '../../services/axiosClient';

// Định nghĩa interface cho dữ liệu từ backend
interface BackendRevenueData {
  startDate: string;
  endDate: string;
  totalRevenue: number;
  periodType: string;
}

// Định nghĩa interface cho dữ liệu frontend sử dụng
interface RevenueData {
  totalAmount: number;
  periodStart: string;
  periodEnd: string;
}

export default function Revenue() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentDateRevenue, setCurrentDateRevenue] = useState<RevenueData | null>(null);
  const [currentMonthRevenue, setMonthRevenue] = useState<RevenueData | null>(null);
  const [currentQuarterRevenue, setQuarterRevenue] = useState<RevenueData | null>(null);
  const [currentYearRevenue, setYearRevenue] = useState<RevenueData | null>(null);

  const [loading, setLoading] = useState({
    currentDate: false,
    currentMonth: false,
    currentQuarter: false,
    currentYear: false,
  });

  const [error, setError] = useState({
    currentDate: null as string | null,
    currentMonth: null as string | null,
    currentQuarter: null as string | null,
    currentYear: null as string | null,
  });

  const navigation = useNavigation();

  useEffect(() => {
    fetchAllRevenue();
  }, []);

  const fetchAllRevenue = async () => {
    fetchCurrentDateRevenue();
    fetchCurrentMonthRevenue();
    fetchCurrentQuarterRevenue();
    fetchCurrentYearRevenue();
  };

  // Hàm ánh xạ dữ liệu từ backend sang frontend
  const mapBackendToFrontend = (backendData: BackendRevenueData | null): RevenueData | null => {
    if (!backendData) {
      return null;
    }
    return {
      totalAmount: backendData.totalRevenue || 0,
      periodStart: backendData.startDate || '',
      periodEnd: backendData.endDate || '',
    };
  };

  const fetchCurrentDateRevenue = async () => {
    try {
      setLoading(prev => ({ ...prev, currentDate: true }));
      const isoDate = currentDate.toISOString();
      const response = await axiosClient.get<BackendRevenueData>(`/payments/revenue/daily?date=${isoDate}`);
      console.log('Phản hồi doanh thu ngày:', response);
      const mappedData = mapBackendToFrontend(response);
      if (mappedData) {
        setCurrentDateRevenue(mappedData);
        setError(prev => ({ ...prev, currentDate: null }));
      } else {
        throw new Error('Dữ liệu doanh thu ngày không hợp lệ');
      }
    } catch (err: unknown) {
      console.error('Lỗi khi lấy doanh thu ngày:', err);
      const errorMessage = err instanceof Error ? err.message : 'Không thể lấy dữ liệu doanh thu ngày';
      setError(prev => ({ ...prev, currentDate: errorMessage }));
      setCurrentDateRevenue(null);
    } finally {
      setLoading(prev => ({ ...prev, currentDate: false }));
    }
  };

  const fetchCurrentMonthRevenue = async () => {
    try {
      setLoading(prev => ({ ...prev, currentMonth: true }));
      const response = await axiosClient.get<BackendRevenueData>(`/payments/revenue/currentMonth`);
      console.log('Phản hồi doanh thu tháng:', response);
      const mappedData = mapBackendToFrontend(response);
      if (mappedData) {
        setMonthRevenue(mappedData);
        setError(prev => ({ ...prev, currentMonth: null }));
      } else {
        throw new Error('Dữ liệu doanh thu tháng không hợp lệ');
      }
    } catch (err: unknown) {
      console.error('Lỗi khi lấy doanh thu tháng:', err);
      const errorMessage = err instanceof Error ? err.message : 'Không thể lấy dữ liệu doanh thu tháng';
      setError(prev => ({ ...prev, currentMonth: errorMessage }));
      setMonthRevenue(null);
    } finally {
      setLoading(prev => ({ ...prev, currentMonth: false }));
    }
  };

  const fetchCurrentQuarterRevenue = async () => {
    try {
      setLoading(prev => ({ ...prev, currentQuarter: true }));
      const response = await axiosClient.get<BackendRevenueData>(`/payments/revenue/currentQuarter`);
      console.log('Phản hồi doanh thu quý:', response);
      const mappedData = mapBackendToFrontend(response);
      if (mappedData) {
        setQuarterRevenue(mappedData);
        setError(prev => ({ ...prev, currentQuarter: null }));
      } else {
        throw new Error('Dữ liệu doanh thu quý không hợp lệ');
      }
    } catch (err: unknown) {
      console.error('Lỗi khi lấy doanh thu quý:', err);
      const errorMessage = err instanceof Error ? err.message : 'Không thể lấy dữ liệu doanh thu quý';
      setError(prev => ({ ...prev, currentQuarter: errorMessage }));
      setQuarterRevenue(null);
    } finally {
      setLoading(prev => ({ ...prev, currentQuarter: false }));
    }
  };

  const fetchCurrentYearRevenue = async () => {
    try {
      setLoading(prev => ({ ...prev, currentYear: true }));
      const response = await axiosClient.get<BackendRevenueData>(`/payments/revenue/currentYear`);
      console.log('Phản hồi doanh thu năm:', response);
      const mappedData = mapBackendToFrontend(response);
      if (mappedData) {
        setYearRevenue(mappedData);
        setError(prev => ({ ...prev, currentYear: null }));
      } else {
        throw new Error('Dữ liệu doanh thu năm không hợp lệ');
      }
    } catch (err: unknown) {
      console.error('Lỗi khi lấy doanh thu năm:', err);
      const errorMessage = err instanceof Error ? err.message : 'Không thể lấy dữ liệu doanh thu năm';
      setError(prev => ({ ...prev, currentYear: errorMessage }));
      setYearRevenue(null);
    } finally {
      setLoading(prev => ({ ...prev, currentYear: false }));
    }
  };

  const formatCurrency = (amount: number) => {
    return amount ? `$${amount.toFixed(2)}` : '$0.00';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Hàm render nút doanh thu
  const renderRevenueButton = (
    title: string,
    data: RevenueData | null,
    isLoading: boolean,
    errorMsg: string | null,
    type: 'daily' | 'monthly' | 'quarterly' | 'yearly'
  ) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('RevenueDetails', { type, data })}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : data ? (
          <View>
            <Text style={styles.revenueAmount}>{formatCurrency(data.totalAmount)}</Text>
            <Text style={styles.periodText}>
              {formatDate(data.periodStart)} - {formatDate(data.periodEnd)}
            </Text>
          </View>
        ) : (
          <Text style={styles.errorText}>Không có dữ liệu</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thống kê doanh thu</Text>
      <Text style={styles.dateText}>
        Ngày hiện tại: {currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}
      </Text>

      <View style={styles.cardsContainer}>
        {renderRevenueButton('Doanh thu ngày', currentDateRevenue, loading.currentDate, error.currentDate, 'daily')}
        {renderRevenueButton('Doanh thu tháng', currentMonthRevenue, loading.currentMonth, error.currentMonth, 'monthly')}
        {renderRevenueButton('Doanh thu quý', currentQuarterRevenue, loading.currentQuarter, error.currentQuarter, 'quarterly')}
        {renderRevenueButton('Doanh thu năm', currentYearRevenue, loading.currentYear, error.currentYear, 'yearly')}
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={fetchAllRevenue}>
        <Text style={styles.refreshButtonText}>Làm mới dữ liệu</Text>
      </TouchableOpacity>
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
    color: COLORS.text,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 24,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    minHeight: 150,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  revenueAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  periodText: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
  },
  refreshButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  refreshButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});