import { StatisticType } from "@/constants/Types/statistic";
import { useFetch } from "@/hooks/useFetch";

export const GetStatisticValue = (type: StatisticType) => {
    let value = { val: 0, loading: true }
    const { data: foodData, loading: foodLoading } = useFetch('foods')
    const { data: comboData, loading: comboLoading } = useFetch('combos')
    const { data: orderData, loading: orderLoading } = useFetch('orders')
    const { data: tableData, loading: tableLoading } = useFetch('tables')
    const { data: paymentData, loading: paymentLoading } = useFetch('payment')
    const { data: staffData, loading: staffLoading } = useFetch('staff')

    switch (type) {
        case 'food':
            value = { val: Array.isArray(foodData) ? foodData.length : 0, loading: foodLoading }
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
    return value
}