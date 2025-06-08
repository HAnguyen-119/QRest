import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
    TextInput,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { COLORS } from '../../constants/colors';
import { RevenueDetailsProps } from '@/constants/Types/revenue';
import { Payment } from '@/constants/Types/payment';
import { fetchAPI } from '@/services/fetchAPI';
import { formatCurrency } from '@/utils/FormatMoney';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Loading from '../Loading';
import { useThemeContext } from '@/contexts/ThemeContext';
import { createRevenueDetailsStyles } from '@/assets/styles/admin/RevenueDetails.styles';
import { createGlobalStyles } from '@/assets/styles/Global.styles';

import closeButton from '@/assets/images/close.png'
import Icon from '../Icon/Icon';
import { BUTTONSIZE, ICONSIZE } from '@/constants/size';

export default function RevenueDetails({ type, data, visible, setVisible }: RevenueDetailsProps) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedQuarter, setSelectedQuarter] = useState(Math.ceil((new Date().getMonth() + 1) / 3));
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [monthlyData, setMonthlyData] = useState<number[]>([]);
    const [quarterlyData, setQuarterlyData] = useState<number[]>([]);
    const [yearlyData, setYearlyData] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [monthInput, setMonthInput] = useState(`${selectedMonth}`)
    const [dateInput, setDateInput] = useState(`${selectedDate}`)
    const [yearInput, setYearInput] = useState(`${selectedYear}`)
    const [quarterInput, setQuarterInput] = useState(`${selectedQuarter}`)

    const { isDark } = useThemeContext()
    const styles = createRevenueDetailsStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    useEffect(() => {
        if (type === 'daily') fetchDailyPayments();
        if (type === 'monthly') fetchMonthlyData();
        if (type === 'quarterly') fetchQuarterlyData();
        if (type === 'yearly') fetchYearlyData();
    }, [type, selectedDate, selectedYear, selectedMonth, selectedQuarter]);

    const fetchDailyPayments = async () => {
        try {
            setLoading(true);
            const response = await fetchAPI.getDailyPaymentByDate(selectedDate);
            if (!response) {
                return <Loading />
            }
            setPayments(Object(response));
            setError(null);
        } catch (err: any) {
            const errorMessage = err.message || 'Can\'t fetch Revenue data';
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
            const date = new Date(selectedYear, selectedMonth, 1);
            const response = await fetchAPI.getMonthlyData(date);
            if (!response) {
                return <Loading />
            }
            setMonthlyData(Object(response));
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
            const date = new Date(selectedYear, (selectedQuarter) * 3, 1);
            const response = await fetchAPI.getQuarterlyData(date);
            if (!response) {
                return <Loading />
            }
            setQuarterlyData(Object(response));
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
            const date = new Date(selectedYear, 0, 1);
            const response = await fetchAPI.getYearlyData(date);
            if (!response) {
                return <Loading />
            }
            setYearlyData(Object(response));
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

    const handleSelectedDate = (event: DateTimePickerEvent, selected?: Date | undefined) => {
        if (event.type === 'set') {
            const currentDate = selected || selectedDate
            setSelectedDate(currentDate)
            setOpenDatePicker(false)
        }
    }
    console.log(selectedDate)
    console.log('payment', payments)

    const renderDaily = () => (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={[styles.pickerButton, globalStyles.cardBackgroundColor]}
                onPress={() => setOpenDatePicker(true)}
            >
                <Text style={[styles.pickerButtonText, globalStyles.text]}>Selected date: {selectedDate.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            {openDatePicker &&
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleSelectedDate}
                />
            }
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
                <Text style={[styles.errorText, globalStyles.text]}>{error}</Text>
            ) : payments.length > 0 ? (
                <>
                    <View style={[styles.tableHeader, globalStyles.cardBackgroundColor, globalStyles.borderColor]}>
                        <Text style={[styles.tableHeaderText, globalStyles.text]}>ID</Text>
                        <Text style={[styles.tableHeaderText, globalStyles.text]}>Price</Text>
                        <Text style={[styles.tableHeaderText, globalStyles.text]}>Time</Text>
                        <Text style={[styles.tableHeaderText, globalStyles.text]}>Payment</Text>
                    </View>
                    <FlatList
                        data={payments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={[styles.tableRow, globalStyles.cardBackgroundColorReverse, globalStyles.borderColor]}>
                                <Text style={[styles.tableCell, globalStyles.textInverse]}>{item.id}</Text>
                                <Text style={[styles.tableCell, globalStyles.textInverse]}>{formatCurrency(item.totalPrice)}</Text>
                                <Text style={[styles.tableCell, globalStyles.textInverse]}>{item.paymentTime.toString().split('T')[1]}</Text>
                                <Text style={[styles.tableCell, globalStyles.textInverse]}>{item.paymentMethod === 'IN_CASH' ? 'In Cash' : 'Bank Transfer'}</Text>
                            </View>
                        )}
                    />
                </>
            ) : (
                <Text style={styles.errorText}>No payments this day!</Text>
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
                        style={[styles.pickerInput, globalStyles.font]}
                        value={monthInput}
                        keyboardType="numeric"
                        placeholder="Month"
                        onChangeText={text => {
                            const month = parseInt(text);
                            setMonthInput(text)
                            if (!isNaN(month) && month >= 1 && month <= 12) {
                                setSelectedMonth(month);
                            }
                        }}
                    />
                    <TextInput
                        style={[styles.pickerInput, globalStyles.font]}
                        value={yearInput}
                        keyboardType="numeric"
                        placeholder="Year"
                        onChangeText={text => {
                            const year = parseInt(text)
                            setYearInput(text)
                            if (!isNaN(year) && year >= 2023) {
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
                            withInnerLines={false}
                            withOuterLines={false}
                            chartConfig={{
                                backgroundColor: !isDark ? COLORS.cardContainerLight : COLORS.cardContainerDark,
                                backgroundGradientFrom: !isDark ? COLORS.cardContainerLight : COLORS.cardContainerDark,
                                backgroundGradientTo: !isDark ? COLORS.cardContainerLight : COLORS.cardContainerDark,
                                decimalPlaces: 2,
                                color: () => COLORS.primary,
                                labelColor: () => !isDark ? COLORS.dark : COLORS.light,
                            }}
                            style={styles.chart}
                        />
                    </ScrollView>
                ) : (
                    <Text style={styles.errorText}>No monthly Revenue data!</Text>
                )}
            </View>
        );
    };

    const renderQuarterly = () => {
        const labels = ['1st month', '2nd month', '3rd month'];
        const dataPoints = quarterlyData;

        return (
            <View>
                <View style={styles.pickerContainer}>
                    <TextInput
                        style={[styles.pickerInput, globalStyles.font]}
                        value={quarterInput}
                        keyboardType="numeric"
                        placeholder="Quarter (1-4)"
                        onChangeText={text => {
                            const quarter = parseInt(text);
                            setQuarterInput(text)
                            if (!isNaN(quarter) && quarter >= 1 && quarter <= 4) {
                                setSelectedQuarter(quarter);
                            }
                        }}
                    />
                    <TextInput
                        style={[styles.pickerInput, globalStyles.font]}
                        value={yearInput}
                        keyboardType="numeric"
                        placeholder="Year"
                        onChangeText={text => {
                            const year = parseInt(text);
                            setYearInput(text)
                            if (!isNaN(year) && year >= 2023) {
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
                        yAxisSuffix=''
                        withInnerLines={false}
                        chartConfig={{
                            backgroundColor: !isDark ? COLORS.cardContainerLight : COLORS.cardContainerDark,
                            backgroundGradientFrom: !isDark ? COLORS.cardContainerLight : COLORS.cardContainerDark,
                            backgroundGradientTo: !isDark ? COLORS.cardContainerLight : COLORS.cardContainerDark,
                            decimalPlaces: 2,
                            color: () => COLORS.primary, // Màu cố định cho tất cả cột
                            fillShadowGradient: COLORS.primary, // Màu đổ bóng cố định
                            fillShadowGradientFrom: COLORS.primary, // Đảm bảo không có gradient
                            fillShadowGradientTo: COLORS.primary, // Đảm bảo không có gradient
                            fillShadowGradientOpacity: 1, // Độ mờ cố định
                            labelColor: () => !isDark ? COLORS.dark : COLORS.light,
                        }}
                        style={styles.chart}
                    />
                ) : (
                    <Text style={styles.errorText}>No quarterly Revenue data!</Text>
                )}
            </View>
        );
    };

    const renderYearly = () => {
        const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        const dataPoints = yearlyData;

        return (
            <View>
                <View style={styles.yearTextSection}>
                    <Text style={[styles.pickerButtonText, globalStyles.text]}>Choose year</Text>
                    <TextInput
                        style={[styles.pickerInput, globalStyles.font]}
                        value={yearInput}
                        keyboardType="numeric"
                        placeholder="Year"
                        onChangeText={text => {
                            const year = parseInt(text);
                            setYearInput(text)
                            if (!isNaN(year) && year >= 2023) {
                                setSelectedYear(year);
                            }
                        }}
                    />
                </View>
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
                        yAxisSuffix=''
                        withInnerLines={false}
                        chartConfig={{
                            backgroundColor: !isDark ? COLORS.cardContainerLight : COLORS.cardContainerDark,
                            backgroundGradientFrom: !isDark ? COLORS.cardContainerLight : COLORS.cardContainerDark,
                            backgroundGradientTo: !isDark ? COLORS.cardContainerLight : COLORS.cardContainerDark,
                            decimalPlaces: 2,
                            color: () => COLORS.primary, // Màu cố định cho tất cả cột
                            fillShadowGradient: COLORS.primary, // Màu đổ bóng cố định
                            fillShadowGradientFrom: COLORS.primary, // Đảm bảo không có gradient
                            fillShadowGradientTo: COLORS.primary, // Đảm bảo không có gradient
                            fillShadowGradientOpacity: 1, 
                            labelColor: () => !isDark ? COLORS.dark : COLORS.light,
                        }}
                        style={styles.chart}
                    />
                ) : (
                    <Text style={styles.errorText}>No yearly Revenue data</Text>
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
            <View style={[styles.container, globalStyles.background]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setVisible(false)}
                >
                    <Icon src={closeButton} width={BUTTONSIZE.width} height={BUTTONSIZE.height} count={null} />
                </TouchableOpacity>
                <Text style={[styles.title, globalStyles.textBold]}>
                    {type === 'daily' ? 'Daily Revenue' : type === 'monthly' ? 'Monthly Revenue' : type === 'quarterly' ? 'Quarterly Revenue' : 'Yearly Revenue'}
                </Text>
                {data && (
                    <View style={styles.summary}>
                        <Text style={[styles.summaryText, globalStyles.text]}>Total Revenue: {formatCurrency(data.totalAmount)}</Text>
                        <Text style={[styles.summaryText, globalStyles.text]}>
                            {type === 'daily' ? `Date: ${selectedDate}` : `Period time:  from ${data.periodStart.split('T')[0]} to ${data.periodEnd.split('T')[0]}`}
                        </Text>
                    </View>
                )}
                {renderContent()}
            </View>
        </Modal>
    );
}