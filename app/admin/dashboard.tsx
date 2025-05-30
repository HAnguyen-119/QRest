import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { COLORS } from '../../constants/colors';
import axiosClient from '../../services/axiosClient';
import { RevenueData, BackendRevenueData, RevenueType } from '@/constants/Types/revenue';
import RevenueDetails from '../../components/Cashier/RevenueDetails';

import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import { formatCurrency } from '@/utils/FormatMoney';
import { useThemeContext } from '@/contexts/ThemeContext';
import { createAdminDashboardStyles } from '@/assets/styles/admin/AdminDashboard.styles';
import { formatDateString } from '@/utils/FormatTime';
import { createGlobalStyles } from '@/assets/styles/Global.styles';
import RevenueCard from '@/components/Revenue/RevenueCard';

export default function Dashboard() {
    const [currentDateRevenue, setCurrentDateRevenue] = useState<RevenueData | null>(null);
    const [currentMonthRevenue, setMonthRevenue] = useState<RevenueData | null>(null);
    const [currentQuarterRevenue, setQuarterRevenue] = useState<RevenueData | null>(null);
    const [currentYearRevenue, setYearRevenue] = useState<RevenueData | null>(null);
    const [visible, setVisible] = useState<boolean>(false)

    const [type, setType] = useState<RevenueType>(null)
    const [loading, setLoading] = useState({
        currentDate: false,
        currentMonth: false,
        currentQuarter: false,
        currentYear: false,
    });
    const [refreshing, setRefreshing] = useState(false)

    const [error, setError] = useState({
        currentDate: null as string | null,
        currentMonth: null as string | null,
        currentQuarter: null as string | null,
        currentYear: null as string | null,
    });

    const { isDark } = useThemeContext()
    const styles = createAdminDashboardStyles(isDark)
    const globalStyles = createGlobalStyles(isDark)

    const currentDate = new Date()

    useEffect(() => {
        fetchAllRevenue();
    }, []);

    const fetchAllRevenue = async () => {
        fetchCurrentDateRevenue();
        fetchCurrentMonthRevenue();
        fetchCurrentQuarterRevenue();
        fetchCurrentYearRevenue();
    };

    const mapBackendToFrontend = (backendData: BackendRevenueData): RevenueData | null => {
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
            const mappedData = mapBackendToFrontend(Object(response));
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
            const mappedData = mapBackendToFrontend(Object(response));
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
            const mappedData = mapBackendToFrontend(Object(response));
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
            const mappedData = mapBackendToFrontend(Object(response));
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

    const getRevenueData = () => {
        switch (type) {
            case 'daily':
                return currentDateRevenue;
            case 'monthly':
                return currentMonthRevenue;
            case 'quarterly':
                return currentQuarterRevenue;
            case 'yearly':
                return currentYearRevenue;
            default:
                return null;
        }
    };

    const onRefresh = async () => {
        setRefreshing(true)
        await fetchAllRevenue()
        setRefreshing(false)
    }


    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.welcomeSection}>
                <Text style={[styles.welcomeText, globalStyles.text]}>WELCOME BACK</Text>
                <Text style={[styles.title, globalStyles.textBold]}>Nguyen Van Muoi</Text>
            </View>
            {visible && type && (
                <RevenueDetails
                    type={type}
                    data={getRevenueData()}
                    visible={visible}
                    setVisible={setVisible}
                />
            )}
            <View style={styles.cardContainer}>
                <RevenueCard type={'daily'} date={new Date()} setType={setType} setVisible={setVisible}/>
                <RevenueCard type={'monthly'} date={new Date(2025, 5, 1)} setType={setType} setVisible={setVisible}/>
                <RevenueCard type={'quarterly'} date={new Date(2025, 5, 1)} setType={setType} setVisible={setVisible}/>
                <RevenueCard type={'yearly'} date={new Date(2025, 5, 1)} setType={setType} setVisible={setVisible}/>
            </View>
        </ScrollView>
    );
}