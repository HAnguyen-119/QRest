import TabsLayout from "../(tabs)/_layout";

export default function CashierLayout() {
    const routes = [
        {name: 'dashboard', title: 'Dashboard', icon: 'home-outline' as const},
        {name: 'payment', title: 'Payment', icon: 'cash-check' as const},
        {name: 'reservation', title: 'Reservation', icon: 'text-box-plus-outline' as const},
    ]
    // @ts-ignore
    return <TabsLayout routes={routes}/>
} 