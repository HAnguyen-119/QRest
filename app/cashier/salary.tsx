import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';
import axiosClient from '../../services/axiosClient'; // Giả định bạn có file constants định nghĩa COLORS
import { StaffDTO } from '@/constants/Types/staff';
import { StyleSheet } from 'react-native';

// Giả định các style được định nghĩa giống đoạn code bạn cung cấp
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  totalSalaryContainer: { marginBottom: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  totalSalaryText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#e0e0e0', padding: 10, borderRadius: 8 },
  tableHeaderText: { flex: 1, fontWeight: 'bold', textAlign: 'center' },
  tableRow: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  tableCell: { flex: 1, textAlign: 'center' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
});

const formatCurrency = (amount: number) => {
    return amount ? `$${amount.toFixed(2)}` : '$0.00';
};

export default function Salary() {
  const [staffSalaries, setStaffSalaries] = useState<StaffDTO[]>([]);
  const [totalSalary, setTotalSalary] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        setLoading(true);
        setError(null); // Reset lỗi trước khi gọi API
        const response = await axiosClient.get<StaffDTO[]>('/staffs/getStaffSalaries');        
        // Lưu dữ liệu vào state
        setStaffSalaries(response);

        // Tính tổng lương
        const total = response.reduce((sum: number, staff: StaffDTO) => sum + staff.salary, 0);
        setTotalSalary(total);
      } catch (err: unknown) {
        console.error('Lỗi khi lấy danh sách lương:', err);
        const errorMessage = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi lấy dữ liệu';
        setError(errorMessage);
        setStaffSalaries([]); // Reset danh sách khi có lỗi
        setTotalSalary(0); // Reset tổng lương khi có lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  // Render bảng lương
  const renderSalaryTable = () => (
    <View>
      {/* Thống kê tổng lương */}
      <View style={styles.totalSalaryContainer}>
        <Text style={styles.totalSalaryText}>
          Tổng lương: {formatCurrency(totalSalary)}
        </Text>
      </View>

      {/* Bảng danh sách lương */}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : staffSalaries.length > 0 ? (
        <FlatList
          data={staffSalaries}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.id}</Text>
              <Text style={styles.tableCell}>{item.fullName}</Text>
              <Text style={styles.tableCell}>{item.position}</Text>
              <Text style={styles.tableCell}>{formatCurrency(item.salary)}</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Mã NV</Text>
              <Text style={styles.tableHeaderText}>Họ tên</Text>
              <Text style={styles.tableHeaderText}>Vị trí</Text>
              <Text style={styles.tableHeaderText}>Lương</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.errorText}>Không có dữ liệu lương</Text>
      )}
    </View>
  );

  return <View style={styles.container}>{renderSalaryTable()}</View>;
}