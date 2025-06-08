import { createStatisticCardStyles } from "@/assets/styles/Card/StatisticCard.styles";
import { StatisticProps, StatisticType } from "@/constants/Types/statistic";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import { Text, View } from "react-native";
import Loading from "../Loading";
import { createGlobalStyles } from "@/assets/styles/Global.styles";
import { GetFooterStatistic } from "@/utils/GetFooterStatistic";

import foodIcon from '@/assets/images/foods.png'
import accountIcon from '@/assets/images/account.png'
import orderIcon from '@/assets/images/orders.png'
import tableIcon from '@/assets/images/tables.png'
import paymentIcon from '@/assets/images/payments.png'
import staffIcon from '@/assets/images/staffs.png'
import Icon from "../Icon/Icon";
import { CATEICON, MINIBUTTON } from "@/constants/size";

export default function StatisticCard({ type }: StatisticProps) {
    const { isDark } = useThemeContext()
    const styles = createStatisticCardStyles(isDark, type)
    const globalStyles = createGlobalStyles(isDark)
    
    let title = ''
    let imageIcon = null

    let value = { val: 0, loading: true }
    const { data: foodData, loading: foodLoading } = useFetch('foods')
    const { data: userData, loading: userLoading } = useFetch('users')
    const { data: orderData, loading: orderLoading } = useFetch('orders')
    const { data: tableData, loading: tableLoading } = useFetch('tables')
    const { data: paymentData, loading: paymentLoading } = useFetch('payment')
    const { data: staffData, loading: staffLoading } = useFetch('staff')

    if (foodLoading || !foodData) {
        return <Loading/>
    } else if (userLoading || !userData) {
        return <Loading/>
    } else if (orderLoading || !orderData) {
        return <Loading/>
    } else if (tableLoading || !tableData) {
        return <Loading/>
    } else if (paymentLoading || !paymentData) {
        return <Loading/>
    } else if (staffLoading || !staffData) {
        return <Loading/>
    }

    let footer = GetFooterStatistic({ type: type, orderData: orderData, paymentData: paymentData})

    switch (type) {
        case 'food':
            title = 'Foods'
            imageIcon = foodIcon
            value = { val: Array.isArray(foodData) ? Object.values(foodData).length : 0, loading: foodLoading }
            break
        case 'user':
            title = 'Accounts'
            imageIcon = accountIcon
            value = { val: Array.isArray(userData) ? userData.length : 0, loading: userLoading }
            break
        case 'order':
            title = 'Orders'
            imageIcon = orderIcon
            value = { val: Array.isArray(orderData) ? orderData.length : 0, loading: orderLoading }
            break
        case 'table':
            title = 'Tables'
            imageIcon = tableIcon
            value = { val: Array.isArray(tableData) ? tableData.length : 0, loading: tableLoading }
            break
        case 'payment':
            title = 'Payments'
            imageIcon = paymentIcon
            value = { val: Array.isArray(paymentData) ? paymentData.length : 0, loading: paymentLoading }
            break
        case 'staff':
            title = 'Staffs'
            imageIcon = staffIcon
            value = { val: Array.isArray(staffData) ? staffData.length : 0, loading: staffLoading }
            break
    }

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={[styles.cardTitle, globalStyles.font]}>{title}</Text>
                <Icon src={imageIcon} width={CATEICON.width} height={CATEICON.height} count={null}/>
            </View>
            <Text style={[styles.cardValue, globalStyles.font]}>{value.val}</Text>
            <Text style={[styles.footer, globalStyles.font]}>{footer}</Text>
        </View>
    )
}