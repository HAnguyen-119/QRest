import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
    TextInput,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { COLORS } from '../../constants/colors';
import axiosClient from '../../services/axiosClient';
import { RevenueData } from '@/constants/Types/revenue';
import { Payment } from '@/constants/Types/payment';
import { fetchAPI } from '@/services/fetchAPI';

export default function RevenueDetails({ type, data, visible, setVisible }) {
    const route = useRoute();
    console.log("revenue details nhan duoc: ", type)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedQuarter, setSelectedQuarter] = useState(Math.ceil((new Date().getMonth() + 1) / 3));
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openYearPicker, setOpenYearPicker] = useState(false);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [monthlyData, setMonthlyData] = useState<number[]>([]);
    const [quarterlyData, setQuarterlyData] = useState<number[]>([]);
    const [yearlyData, setYearlyData] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('useEffect triggered:', { type, selectedDate, selectedYear, selectedMonth, selectedQuarter });
        if (type === 'daily') fetchDailyPayments();
        if (type === 'monthly') fetchMonthlyData();
        if (type === 'quarterly') fetchQuarterlyData();
        if (type === 'yearly') fetchYearlyData();
    }, [type, selectedDate, selectedYear, selectedMonth, selectedQuarter]);

    console.log(type+'dm')

    const fetchDailyPayments = async () => {
        try {
            setLoading(true);
            const isoDate = selectedDate.toISOString();
            console.log('Fetching daily payments for date:', isoDate);
            const response = await fetchAPI.getDailyPayment(isoDate);
            console.log(response);
            setPayments(response);
            setError(null);
        } catch (err: any) {
            const errorMessage = err.message || 'Không thể lấy dữ liệu giao dịch';
            console.error('Error fetching daily payments:', errorMessage);
            setError(errorMessage);
            setPayments([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchMonthlyData = async () => {
        try {
            setLoading(true);
            const date = new Date(selectedYear, selectedMonth, 1).toISOString();
            console.log('Fetching monthly data for date:', date);
            const response = await fetchAPI.getMonthlyData(date);
            console.log('Monthly response:', response);
            setMonthlyData(response);
            setError(null);
        } catch (err: any) {
            const errorMessage = err.message || 'Không thể lấy dữ liệu tháng';
            console.error('Error fetching monthly data:', errorMessage);
            setError(errorMessage);
            setMonthlyData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchQuarterlyData = async () => {
        try {
            setLoading(true);
            const date = new Date(selectedYear, (selectedQuarter) * 3, 1).toISOString();
            console.log('Fetching quarterly data for date:', date);
            const response = await fetchAPI.getQuarterlyData(date);
            console.log('Quarterly response:', response);
            setQuarterlyData(response);
            setError(null);
        } catch (err: any) {
            const errorMessage = err.message || 'Không thể lấy dữ liệu quý';
            console.error('Error fetching quarterly data:', errorMessage);
            setError(errorMessage);
            setQuarterlyData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchYearlyData = async () => {
        try {
            setLoading(true);
            const date = new Date(selectedYear, 0, 1).toISOString();
            console.log('Fetching yearly data for date:', date);
            const response = await fetchAPI.getYearlyData(date);
            console.log('Yearly response:', response);
            setYearlyData(response);
            setError(null);
        } catch (err: any) {
            const errorMessage = err.message || 'Không thể lấy dữ liệu năm';
            console.error('Error fetching yearly data:', errorMessage);
            setError(errorMessage);
            setYearlyData([]);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return amount ? `$${amount.toFixed(2)}` : '$0.00';
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const renderDaily = () => (
        <View>
            <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => {
                    console.log('Opening date picker for daily');
                    setOpenDatePicker(true);
                }}
            >
                <Text style={styles.pickerButtonText}>Chọn ngày: {formatDate(selectedDate.toISOString())}</Text>
            </TouchableOpacity>
            <DatePicker
                modal
                open={openDatePicker}
                date={selectedDate}
                mode="date"
                locale="vi-VN"
                onConfirm={date => {
                    console.log('Selected date:', date.toISOString());
                    setOpenDatePicker(false);
                    setSelectedDate(date);
                }}
                onCancel={() => {
                    console.log('Date picker cancelled');
                    setOpenDatePicker(false);
                }}
            />
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : payments.length > 0 ? (
                <FlatList
                    data={payments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.id}</Text>
                            <Text style={styles.tableCell}>{item.order.id}</Text>
                            <Text style={styles.tableCell}>{formatCurrency(item.totalPrice)}</Text>
                            <Text style={styles.tableCell}>{formatDate(item.paymentTime)}</Text>
                            <Text style={styles.tableCell}>{item.paymentMethod}</Text>
                        </View>
                    )}
                    ListHeaderComponent={() => (
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Mã thanh toán</Text>
                            <Text style={styles.tableHeaderText}>Mã đơn</Text>
                            <Text style={styles.tableHeaderText}>Số tiền</Text>
                            <Text style={styles.tableHeaderText}>Ngày giờ</Text>
                            <Text style={styles.tableHeaderText}>Phương thức</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.errorText}>Không có giao dịch trong ngày</Text>
            )}
        </View>
    );

    const renderMonthly = () => {
        const labels = Array.from({ length: monthlyData.length }, (_, i) => `${i + 1}`);
        const dataPoints = monthlyData;

        return (
            <View>
                <View style={styles.pickerContainer}>
                    <TextInput
                        style={styles.pickerInput}
                        value={`${selectedMonth}`}
                        keyboardType="numeric"
                        placeholder="Tháng (1-12)"
                        onChangeText={text => {
                            const month = parseInt(text);
                            if (!isNaN(month) && month >= 1 && month <= 12) {
                                console.log('Selected month:', month);
                                setSelectedMonth(month);
                            }
                        }}
                    />
                    <TextInput
                        style={styles.pickerInput}
                        value={`${selectedYear}`}
                        keyboardType="numeric"
                        placeholder="Năm"
                        onChangeText={text => {
                            const year = parseInt(text);
                            if (!isNaN(year) && year >= 2023) {
                                console.log('Selected year:', year);
                                setSelectedYear(year);
                            }
                        }}
                    />
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : monthlyData.length > 0 ? (
                    <ScrollView horizontal>
                        <LineChart
                            data={{
                                labels,
                                datasets: [{ data: dataPoints }],
                            }}
                            width={Math.max(Dimensions.get('window').width, labels.length * 50)}
                            height={220}
                            yAxisLabel="$"
                            chartConfig={{
                                backgroundColor: COLORS.white,
                                backgroundGradientFrom: COLORS.white,
                                backgroundGradientTo: COLORS.white,
                                decimalPlaces: 2,
                                color: () => COLORS.primary,
                                labelColor: () => COLORS.text,
                            }}
                            style={styles.chart}
                        />
                    </ScrollView>
                ) : (
                    <Text style={styles.errorText}>Không có dữ liệu trong tháng</Text>
                )}
            </View>
        );
    };

    const renderQuarterly = () => {
        const labels = ['Tháng thứ nhất', 'Tháng thứ hai', 'Tháng thứ ba'];
        const dataPoints = quarterlyData;

        return (
            <View>
                <View style={styles.pickerContainer}>
                    <TextInput
                        style={styles.pickerInput}
                        value={`${selectedQuarter}`}
                        keyboardType="numeric"
                        placeholder="Quý (1-4)"
                        onChangeText={text => {
                            const quarter = parseInt(text);
                            if (!isNaN(quarter) && quarter >= 1 && quarter <= 4) {
                                console.log('Selected quarter:', quarter);
                                setSelectedQuarter(quarter);
                            }
                        }}
                    />
                    <TextInput
                        style={styles.pickerInput}
                        value={`${selectedYear}`}
                        keyboardType="numeric"
                        placeholder="Năm"
                        onChangeText={text => {
                            const year = parseInt(text);
                            if (!isNaN(year) && year >= 2023) {
                                console.log('Selected year:', year);
                                setSelectedYear(year);
                            }
                        }}
                    />
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : quarterlyData.length > 0 ? (
                    <BarChart
                        data={{
                            labels,
                            datasets: [{ data: dataPoints }],
                        }}
                        width={Dimensions.get('window').width - 32}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={{
                            backgroundColor: COLORS.white,
                            backgroundGradientFrom: COLORS.white,
                            backgroundGradientTo: COLORS.white,
                            decimalPlaces: 2,
                            color: () => COLORS.primary, // Màu cố định cho tất cả cột
                            fillShadowGradient: COLORS.primary, // Màu đổ bóng cố định
                            fillShadowGradientFrom: COLORS.primary, // Đảm bảo không có gradient
                            fillShadowGradientTo: COLORS.primary, // Đảm bảo không có gradient
                            fillShadowGradientOpacity: 1, // Độ mờ cố định
                            labelColor: () => COLORS.text,
                        }}
                        style={styles.chart}
                    />
                ) : (
                    <Text style={styles.errorText}>Không có dữ liệu trong quý</Text>
                )}
            </View>
        );
    };

    const renderYearly = () => {
        const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        const dataPoints = yearlyData;

        return (
            <View>
                <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={() => {
                        console.log('Opening year picker');
                        setOpenYearPicker(true);
                    }}
                >
                    <Text style={styles.pickerButtonText}>Chọn năm: {selectedYear}</Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={openYearPicker}
                    date={new Date(selectedYear, 0, 1)}
                    mode="date"
                    locale="vi-VN"
                    minimumDate={new Date(2023, 0, 1)}
                    maximumDate={new Date()}
                    onConfirm={date => {
                        console.log('Selected year:', date.getFullYear());
                        setOpenYearPicker(false);
                        setSelectedYear(date.getFullYear());
                    }}
                    onCancel={() => {
                        console.log('Year picker cancelled');
                        setOpenYearPicker(false);
                    }}
                />
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : yearlyData.length > 0 ? (
                    <BarChart
                        data={{
                            labels,
                            datasets: [{ data: dataPoints }],
                        }}
                        width={Dimensions.get('window').width - 32}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={{
                            backgroundColor: COLORS.white,
                            backgroundGradientFrom: COLORS.white,
                            backgroundGradientTo: COLORS.white,
                            decimalPlaces: 2,
                            color: () => COLORS.primary, // Màu cố định cho tất cả cột
                            fillShadowGradient: COLORS.primary, // Màu đổ bóng cố định
                            fillShadowGradientFrom: COLORS.primary, // Đảm bảo không có gradient
                            fillShadowGradientTo: COLORS.primary, // Đảm bảo không có gradient
                            fillShadowGradientOpacity: 1, // Độ mờ cố định
                            labelColor: () => COLORS.text,
                        }}
                        style={styles.chart}
                    />
                ) : (
                    <Text style={styles.errorText}>Không có dữ liệu trong năm</Text>
                )}
            </View>
        );
    };

    const renderContent = () => {
        switch (type) {
            case 'daily':
                return renderDaily();
            case 'monthly':
                return renderMonthly();
            case 'quarterly':
                return renderQuarterly();
            case 'yearly':
                return renderYearly();
            default:
                return null;
        }
    };

    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(false)}
            animationType='slide'
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setVisible(false)}
                >
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                    Chi tiết {type === 'daily' ? 'ngày' : type === 'monthly' ? 'tháng' : type === 'quarterly' ? 'quý' : 'năm'}
                </Text>
                {data && (
                    <View style={styles.summary}>
                        <Text style={styles.summaryText}>Tổng doanh thu: {formatCurrency(data.totalAmount)}</Text>
                        <Text style={styles.summaryText}>
                            Khoảng thời gian: {formatDate(data.periodStart)} - {formatDate(data.periodEnd)}
                        </Text>
                    </View>
                )}
                <ScrollView contentContainerStyle={styles.scrollContent}>{renderContent()}</ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingBottom: 16,
    },
    backButton: {
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    backButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '500',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 16,
    },
    summary: {
        marginBottom: 16,
    },
    summaryText: {
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 4,
    },
    pickerButton: {
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    pickerButtonText: {
        fontSize: 16,
        color: COLORS.text,
    },
    pickerContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    pickerInput: {
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
        width: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        fontSize: 16,
        color: COLORS.text,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.grayLight,
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    tableHeaderText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tableCell: {
        flex: 1,
        fontSize: 14,
        color: COLORS.text,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 16,
    },
});