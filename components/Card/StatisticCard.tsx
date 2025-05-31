import { createStatisticCardStyles } from "@/assets/styles/Card/StatisticCard.styles";
import { StatisticProps, StatisticType } from "@/constants/Types/statistic";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { Text, View } from "react-native";

export default function StatisticCard({ type }: StatisticProps) {
    const { isDark } = useThemeContext()
    const styles = createStatisticCardStyles(isDark)

    let title = '';

    switch (type) {
        case 'food':
            title = 'Total Foods';
            break;
        case 'combo':
            title = 'Total Combos';
            break;
        case 'order':
            title = 'Total Orders';
            break;
        case 'table':
            title = 'Total Tables';
            break;
        case 'payment':
            title = 'Total Payments';
            break;
        case 'staff':
            title = 'Total Staff';
            break;
        default:
            title = '';
    }

    let value = { val: 0, loading: true }
    const { data: foodData, loading: foodLoading } = useFetch('foods')
    const { data: comboData, loading: comboLoading } = useFetch('combos')
    const { data: orderData, loading: orderLoading } = useFetch('orders')
    const { data: tableData, loading: tableLoading } = useFetch('tables')
    const { data: paymentData, loading: paymentLoading } = useFetch('payment')
    const { data: staffData, loading: staffLoading } = useFetch('staff')

    if (foodLoading || comboLoading || orderLoading || tableLoading || paymentLoading || staffLoading) {
        return null
    }

    switch (type) {
        case 'food':
            value = { val: Array.isArray(foodData) ? Object.values(foodData).length : 0, loading: foodLoading }
            break
        case 'combo':
            value = { val: Array.isArray(comboData) ? comboData.length : 0, loading: comboLoading }
            break
        case 'order':
            value = { val: Array.isArray(orderData) ? orderData.length : 0, loading: orderLoading }
            break
        case 'table':
            value = { val: Array.isArray(tableData) ? tableData.length : 0, loading: tableLoading }
            break
        case 'payment':
            value = { val: Array.isArray(paymentData) ? paymentData.length : 0, loading: paymentLoading }
            break
        case 'staff':
            value = { val: Array.isArray(staffData) ? staffData.length : 0, loading: staffLoading }
            break
    }

    return (
        <View >
            <View>
                <Text>
                    {title}
                </Text>
            </View>
            <View>
                <Text>
                    {value.val}
                </Text>
            </View>
            <View>
                <Text></Text>
            </View>
        </View>
    )
}