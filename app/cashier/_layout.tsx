import TabsLayout from "../(tabs)/_layout";

export default function CashierLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'card-outline' as const},
        {name: 'payment', title: 'Payment', icon: 'timer-outline' as const},
        {name: 'reservation', title: 'Reservation', icon: 'add-circle-outline' as const},
        {name: 'salary', title: 'Salary', icon: 'card-outline' as const},
    ]
    return <TabsLayout routes={routes}/>
} 