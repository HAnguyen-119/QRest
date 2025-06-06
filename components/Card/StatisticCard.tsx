import { createStatisticCardStyles } from "@/assets/styles/Card/StatisticCard.styles";
import { StatisticProps, StatisticType } from "@/constants/Types/statistic";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { Text, View } from "react-native";
import Loading from "../Loading";
import { createGlobalStyles } from "@/assets/styles/Global.styles";

export default function StatisticCard({ type }: StatisticProps) {
    const { isDark } = useThemeContext()
    const styles = createStatisticCardStyles(isDark, type)
    const globalStyles = createGlobalStyles(isDark)
    
    let title = ''
    let footer = ''

    let value = { val: 0, loading: true }
    const { data: foodData, loading: foodLoading } = useFetch('foods')
    const { data: comboData, loading: comboLoading } = useFetch('combos')
    const { data: orderData, loading: orderLoading } = useFetch('orders')
    const { data: tableData, loading: tableLoading } = useFetch('tables')
    const { data: paymentData, loading: paymentLoading } = useFetch('payment')
    const { data: staffData, loading: staffLoading } = useFetch('staff')

    if (foodLoading) {
        return <Loading/>
    } else if (comboLoading) {
        return <Loading/>
    } else if (orderLoading) {
        return <Loading/>
    } else if (tableLoading) {
        return <Loading/>
    } else if (paymentLoading) {
        return <Loading/>
    } else if (staffLoading) {
        return <Loading/>
    }

    switch (type) {
        case 'food':
            title = 'Total Foods'
            value = { val: Array.isArray(foodData) ? Object.values(foodData).length : 0, loading: foodLoading }
            break
        case 'combo':
            title = 'Total Combos'
            value = { val: Array.isArray(comboData) ? comboData.length : 0, loading: comboLoading }
            break
        case 'order':
            title = 'Orders'
            value = { val: Array.isArray(orderData) ? orderData.length : 0, loading: orderLoading }
            break
        case 'table':
            title = 'Total Tables'
            value = { val: Array.isArray(tableData) ? tableData.length : 0, loading: tableLoading }
            break
        case 'payment':
            title = 'Payments'
            value = { val: Array.isArray(paymentData) ? paymentData.length : 0, loading: paymentLoading }
            break
        case 'staff':
            title = 'Staff'
            value = { val: Array.isArray(staffData) ? staffData.length : 0, loading: staffLoading }
            break
    }

    return (
        <View style={styles.card}>
            <Text style={[styles.cardTitle, globalStyles.font]}>{title}</Text>
            <Text style={[styles.cardValue, globalStyles.font]}>{value.val}</Text>
            <Text>{footer}</Text>
        </View>
    )
}