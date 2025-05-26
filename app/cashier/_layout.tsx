import TabsLayout from "../(tabs)/_layout";

export default function CashierLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'card-outline' as const},
        {name: 'payment', title: 'Payment', icon: 'timer-outline' as const},
        {name: 'reservation', title: 'Reservation', icon: 'add-circle-outline' as const},
        {name: 'salary', title: 'Salary', icon: 'money-bill-alt' as const},
        {name: 'revenue', title: 'Revenue', icon: 'chart-line' as const},
        {name: 'RevenueDetails', title: 'Statistic', icon: 'chart-line' as const}
    ]
    return <TabsLayout routes={routes}/>
} 